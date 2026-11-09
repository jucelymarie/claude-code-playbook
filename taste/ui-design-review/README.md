# ui-design-review

Redesign a UI screen without jumping straight to code. Claude reads the current implementation,
runs a three-role design audit (UX, brand consistency, accessibility/mobile), renders **5 distinct
mockups in one interactive HTML file**, and stops. Implementation and test plans are written only
for the design you pick.

**Why it exists:** the most expensive UI rework comes from building the first idea. A hard approval
gate before any code moves the debate to a cheap artifact.

- **Needs:** Claude Code, a git repo. Works best when the project has a brand reference (landing page, style guide, or `DESIGN.md`).
- **Install:** copy this folder to `~/.claude/skills/ui-design-review/` (or `.claude/skills/` in a project).
- **Try it:** "Redesign the settings page to match our landing page. Show me options first."
- **You get:** a mockup HTML file with select-and-feedback buttons, then (after you choose) an implementation plan, a session protocol to paste into Claude Code, and PASS/FAIL test cases.
