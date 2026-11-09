# Linear reference (field-tested)

Notes for running `../SKILL.md` against Linear through the Linear MCP. Learned running real bug bashes
before a production launch.

## Term mapping

| Skill term | Linear |
|---|---|
| Team | Team |
| Release container | Project |
| Bug bash group | Milestone (inside the project) |
| Bug / enhancement type | Labels `Bug` / `Feature` |
| Priority | 1 = Urgent, 2 = High, 3 = Medium, 4 = Low |
| Related / blocks links | `relatedTo`, `blockedBy`, `blocks` |

## Tool calls that work

- Search: `list_issues` with a keyword `query` and `team`.
- Create or update: `save_issue` (pass `id` to update).
- Read one: `get_issue` with the display ID.
- Comment: `save_comment` with `issueId` set to the **full UUID** from the `save_issue` response,
  not the display ID.

## Known constraints

- **Screenshots cannot be attached through the API** (the base64 payload is too large). Describe the
  screenshot in the ticket and ask the user to attach it manually.
- **Markdown tables can come out mangled** when saved through the API. Check rendering in the browser.
- **Custom states may not exist.** If "On Hold" is not configured, park the ticket with a comment.
- **`save_comment` sometimes hits approval gates or connection drops.** If it fails, give the user the comment text to paste.
- **`list_issues` with a state filter can be unreliable.** Prefer keyword queries or direct `get_issue` calls.
- **`list_issues` with a milestone parameter** returns cleaner results than filtering by project, then milestone.
