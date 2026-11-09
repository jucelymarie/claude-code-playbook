# readonly-db-query

Let Claude pull a real number from a production database without being able to hurt it: SELECT-only,
never prints the connection string, and **refuses to connect unless the URL matches the database you
expect**, so a wrong env file fails closed.

**Why it exists:** grounding product and marketing claims in real data is valuable, and the cheapest
time to stop an agent from querying the wrong database is before it connects.

- **Needs:** Node, the `postgres` npm package, and an env file with `DATABASE_URL`.
- **Install:** copy this folder to `~/.claude/skills/readonly-db-query/`.
- **Try it:** "How many orders were created last week in prod? Use the read-only query skill."
- **Test the guard:** `node test/guard.test.cjs` (no database needed).
