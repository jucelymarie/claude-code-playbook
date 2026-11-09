# ui-design-review

**See your options before anything gets built.**

Ask an AI coding agent for a new screen or a change to an existing one, and it builds the first idea it
has. If that idea is wrong, you find out after the code is written, and every round of "not quite"
costs another rebuild. It's the same problem as a developer building from a vague ticket, only faster.

This skill puts a design review in front of every UI change:

- **It reads what exists first:** the current screen, or for a new screen, the screens around it,
  the brand style, and the flows that must not break.
- **It runs a quick design audit** from three angles: ease of use, brand consistency, and
  mobile and accessibility.
- **It shows you 5 genuinely different designs** in one page you open in your browser. Pick one, add
  feedback, and paste your choice back.
- **Nothing gets built until you choose.** Then it writes the build plan for that design only, plus
  pass/fail test cases and a checklist the agent must clear before calling the work done.

## When to use it

Any time the result is something a user will see: a new page, screen, or component; a layout change;
new fields on a form; a restyle to match the brand. If it touches the UI, it goes through review first.

## Who it's for

Founders, product managers, and designers who direct AI coding agents and want to decide what gets
built, instead of reacting to what got built.

## Setup

- **Needs:** Claude Code in your project. Works best when the project has a brand reference: a
  landing page, a style guide, or a `DESIGN.md`.
- **Install:** copy this folder to `~/.claude/skills/ui-design-review/` (or `.claude/skills/` in a project).
- **Try it:** "Add a profile settings screen that matches our landing page."
