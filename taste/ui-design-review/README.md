# ui-design-review

**See your options before anything gets built.**

Ask an AI coding agent for a new screen or a change to an existing one, and it builds the first idea it
has. If that idea is wrong, you find out after the code is written, and every round of "not quite"
costs another rebuild. It's the same problem as a developer building from a vague ticket, only faster.

This skill puts a design review in front of every UI change:

- **It reads what exists first:** the current screen, or for a new screen, the screens around it,
  the brand style, and the flows that must not break.
- **It keeps the app consistent.** AI agents building a new screen tend to put common buttons in a
  new spot or give them a new style, so the app slowly stops feeling like one product. This skill
  maps where things already live (main actions, back, headers, navigation), follows your design
  system and guidelines, and reuses your existing buttons, cards, and forms instead of inventing new ones.
- **It runs a quick design audit** from three angles: ease of use, brand and consistency,
  and mobile and accessibility.
- **It shows you 5 genuinely different designs** in one page you open in your browser. The
  designs differ in how the screen's content is arranged, not in where the familiar controls go. Pick one, add
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
