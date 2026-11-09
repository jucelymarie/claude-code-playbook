// Self-test for the host guard in SKILL.md. Run: node test/guard.test.cjs
// No database or network needed.
const assert = require('node:assert')

function assertExpectedHost(rawUrl, expectedHost) {
  if (!rawUrl) throw new Error('no DATABASE_URL')
  if (!expectedHost) throw new Error('no EXPECTED_DB_HOST set')
  let host
  try {
    host = new URL(rawUrl).hostname
  } catch {
    throw new Error('DATABASE_URL is not a valid URL')
  }
  const user = new URL(rawUrl).username
  if (!host.includes(expectedHost) && !user.includes(expectedHost)) {
    throw new Error('REFUSING: connection does not match EXPECTED_DB_HOST')
  }
}

const cases = [
  ['matches host', 'postgres://user@db.prodref.example.com:5432/app', 'prodref', true],
  ['matches pooler username', 'postgres://postgres.prodref@pooler.example.com:6543/app', 'prodref', true],
  ['wrong database', 'postgres://user@db.stagingref.example.com:5432/app', 'prodref', false],
  ['missing url', '', 'prodref', false],
  ['missing expected host', 'postgres://user@db.prodref.example.com:5432/app', '', false],
  ['not a url', 'not a url', 'prodref', false],
]

for (const [name, url, expected, shouldPass] of cases) {
  let passed = true
  try {
    assertExpectedHost(url, expected)
  } catch {
    passed = false
  }
  assert.strictEqual(passed, shouldPass, `case failed: ${name}`)
  console.log(`ok - ${name}`)
}
console.log('guard self-test passed')
