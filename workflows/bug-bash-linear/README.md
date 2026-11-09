# bug-bash-linear

Run a bug bash from a chat window: share a screenshot and a sentence, and Claude files a structured
Linear ticket with repro steps, PASS/FAIL acceptance criteria, cross-platform test cases, and
**bug-specific diagnostic steps Claude Code must complete before touching code**. Each ticket also
gets a copy-paste session protocol so every fix happens in its own focused Claude Code session.

**Why it exists:** a common way agents fail at bug fixes is patching the wrong layer. Writing the
diagnosis plan into the ticket, and holding to one bug per session, makes the agent find the
failing layer and get approval before it writes a fix.

- **Needs:** Claude (chat or Code) with the Linear MCP.
- **Install:** copy this folder to `~/.claude/skills/bug-bash-linear/`, or paste `SKILL.md` into a Claude project's instructions.
- **Try it:** share a screenshot and say "bug bash: the save button does nothing on mobile Safari."
- **Also does:** duplicate checks, root-cause linking, a running tally, handoff prompts for a teammate, and grouping tickets into parallel agent tracks.
- **See it in context:** [case study](../../case-studies/bug-to-ship-pipeline.md).
