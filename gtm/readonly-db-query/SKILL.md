---
name: readonly-db-query
description: Run a safe, read-only query against a specific Postgres database (usually production) to pull a stat or verify data. The script refuses to run unless the connection points at the expected host, never prints the connection string, and reads timestamps as text to avoid time-zone shifts. Use whenever the user asks to pull a number from prod, check production data, confirm a queue is empty, or ground a claim in real data.
---

# Read-Only Database Query

Pull a number from a live database safely. **SELECTs only, never a write.**

## Safety rules

- **SELECT only.** No INSERT, UPDATE, DELETE, or DDL. No reset or migration commands.
- **Never echo the connection string.** Load `DATABASE_URL` from the env file; never print it.
  Confirm which database you hit with `select current_database()`, not by logging the URL.
- **Guard on the host.** The script refuses to connect unless the URL's host contains
  `EXPECTED_DB_HOST`. A wrong env file fails closed instead of querying the wrong database.
- **Timestamps:** postgres.js shifts `timestamp without time zone` by the local time zone on a
  non-UTC machine. Read timestamps with `::text` and do date math in SQL.
- **Clean up** the temp script when done.

## Setup (once per project)

Ask the user for, or find in the project's docs:

- the env file that holds the target `DATABASE_URL` (for example `.env.production`)
- the expected host fragment for that database (for example the project ref or hostname).
  Hostnames and project refs are not secrets; the password inside `DATABASE_URL` is.

Requires Node and the `postgres` package. Run from the project root.

## Template

Write a temp `_diag.cjs` at the project root, run it, then delete it:

```js
/* READ-ONLY diagnostic. SELECTs only. */
require('dotenv').config({ path: process.env.ENV_FILE || '.env' })
const url = process.env.DATABASE_URL
const expected = process.env.EXPECTED_DB_HOST

function assertExpectedHost(rawUrl, expectedHost) {
  if (!rawUrl) throw new Error('no DATABASE_URL')
  if (!expectedHost) throw new Error('no EXPECTED_DB_HOST set')
  let host
  try {
    host = new URL(rawUrl).hostname
  } catch {
    throw new Error('DATABASE_URL is not a valid URL')
  }
  // Check host AND username: poolers often share a hostname and put the project ref in the user.
  const user = new URL(rawUrl).username
  if (!host.includes(expectedHost) && !user.includes(expectedHost)) {
    throw new Error('REFUSING: connection does not match EXPECTED_DB_HOST')
  }
}

assertExpectedHost(url, expected)

const postgres = require('postgres')
;(async () => {
  const sql = postgres(url, { max: 1, idle_timeout: 5, connect_timeout: 15 })
  const db = (await sql`select current_database() db`)[0].db
  console.log('DB:', db, '- READ ONLY\n')

  // ---- your SELECTs here ----
  // Read timestamps as text to dodge the tz shift:
  //   select created_at::text ts from orders where ...
  // Do date-window math in SQL:
  //   where created_at::text >= '2026-06-07' and created_at::text < '2026-06-12'

  await sql.end()
})().catch((e) => {
  console.error('ERR:', e.message)
  process.exit(1)
})
```

Run and clean up:

```bash
ENV_FILE=.env.production EXPECTED_DB_HOST=<host-fragment> node _diag.cjs
rm -f _diag.cjs
```

## Guard self-test

Before trusting the guard on a new project, prove it refuses a mismatch (no network needed):

```bash
DATABASE_URL='postgres://user@some-other-host.example.com:5432/db' EXPECTED_DB_HOST=my-prod-ref node _diag.cjs
# expected: ERR / REFUSING: connection does not match EXPECTED_DB_HOST, exit code 1
```

`test/guard.test.cjs` in this folder runs the same check as a script.

## Notes

- For many rows, pull them and aggregate in JS; keep the SQL to plain SELECTs.
- A timeout on a fast query usually means connection-pool starvation, not a slow query. `max: 1` is right for a one-shot script.
