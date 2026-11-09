---
name: ui-design-review
description: >
  Use this skill for ANY user interface work: creating a new screen, page, or component, changing an
  existing one, redesigning, restyling, or adding fields or sections to a UI. Use it whenever the user
  asks for a screen change or creation, shares a screenshot or mockup of a UI, or asks to improve,
  modernize, or match a brand style. Triggers include "add a page", "build a screen", "change the layout",
  "redesign this", "create mockups", "show me options", and any request whose result is something a user
  will see and interact with. This skill gates implementation behind user approval of a selected
  mockup: it never writes implementation code until the user has reviewed and selected a design.
---

# UI Design Review Skill

A structured workflow for any UI change or new screen: analyze the current state (or, for a new
screen, the neighboring screens it must fit with), generate 5 mockup
concepts rendered as interactive HTML for in-browser review, collect user feedback and selection,
then produce an implementation plan and test plan for the chosen design only.

The key principle: **never write implementation code before the user has selected a design.**
The mockup review step is a hard gate.

---

## Phase 0: Branch First

Before any analysis or design work, create the git branch.

```bash
git fetch origin
git worktree add ../worktrees/<ticket-or-feature-name> -b feature/<ticket-or-feature-name> origin/<base-branch>
git worktree list
```

Confirm the worktree was created and report the branch name to the user. Then proceed.

---

## Phase 1: Understand What Exists

**Read before designing.** Do all of the following:

1. **Identify the current implementation files** — find the component/page file(s) for the feature being changed and read them fully. For a brand-new screen, read the closest existing screens and the navigation it will live in, so the new screen matches them.

2. **Identify what must NOT break** — look for:
   - Existing working flows (the user will often say "this currently works, protect it")
   - Auth/access guards
   - API calls and their expected shapes
   - Any state the component reads or writes

3. **Find the brand reference** — the user will typically say "match the landing page" or point at a style guide. Either:
   - Read that page or style guide if it is in the codebase (also check for a DESIGN.md)
   - Or ask the user: "Can you share a screenshot or URL of the page whose visual style I should match?"

4. **Extract the design system** — from existing components, note: color tokens, font sizes, spacing patterns, card designs, button styles, border-radius values, and any Tailwind utility patterns in use.

Summarize findings in a brief diagnostic before proceeding to Phase 2:

```
Current implementation: [file paths]
Must-protect flows: [list]
Brand reference captured: [yes/no — what you found]
Design system tokens: [key values]
New fields required: [from user's prompt]
```

Get a quick acknowledgment or correction from the user before generating mockups.

---

## Phase 2: Design Agent Review

Simulate a 3-role design team reviewing the current UI. Keep this concise — one short paragraph per agent.

**Agent 1 — UX Critic:** What is broken or frustrating about the current UI? Focus on flow, clarity, and user cognitive load.

**Agent 2 — Brand Consistency Checker:** Does the current UI match the brand reference tone, typography, and visual language? What's misaligned?

**Agent 3 — Accessibility & Mobile Reviewer:** What responsiveness or accessibility issues exist? What must any new design fix?

Present this as a brief "Design Audit" (3–5 bullet points per agent, max). Then proceed to mockup generation.

---

## Phase 3: Generate 5 Mockup Concepts (HTML — browser-viewable)

Generate 5 distinct design directions as a **single interactive HTML file** the user can open in their browser.

### HTML Output Requirements

- All 5 mockups rendered in one HTML file using CSS Grid or Flexbox
- Each mockup in its own card with a title and 2-sentence design rationale
- Each mockup includes a **"Select This Design"** button
- Clicking a button: highlights that card with a selection border and populates a feedback textarea below
- A **"Submit Selection + Feedback"** button at the bottom copies the selection + feedback to clipboard
  (since there's no server, clipboard is the handoff mechanism)
- Use brand colors and font stack extracted in Phase 1
- Show all 5 side-by-side on desktop, stacked on mobile
- Each mockup must render the new fields specified by the user (don't leave them as `[placeholder]`)

### Mockup Concepts to Generate

Each concept must be meaningfully different — not just color swaps:

1. **Concept A — Refined Current:** Clean evolution of the existing design, minimal disruption
2. **Concept B — Card-Centered:** Key content in a prominent card, supporting fields below
3. **Concept C — Split Layout:** Two-column layout (form fields left, context/preview right)
4. **Concept D — Progressive Disclosure:** Stepped/wizard approach — one section at a time
5. **Concept E — Brand-Forward:** Maximum visual alignment with the brand reference — hero treatment, brand tone in copy

### After Generating the HTML

Save the file and present it. Then tell the user:

> "The mockups are ready to view. Open the file in your browser, review all 5 concepts,
> click 'Select This Design' on your preferred option, add any feedback, then click
> 'Submit Selection + Feedback' to copy your selection. Paste it here when you're ready
> and I'll build the implementation plan."

**Stop here. Do not proceed to implementation until the user returns with a selection.**

---

## Phase 4: Implementation Plan (after user selects)

Once the user pastes their selection and feedback, generate the implementation plan for the **chosen mockup only**.

### Implementation Plan Structure

```
## Selected Design: [Concept name]
## User Feedback Applied: [summarize adjustments]

### Files to Change
- [file path] — [what changes and why]

### Files to Create
- [file path] — [purpose]

### New Dependencies (if any)
- [package] — [reason]

### API / Data Changes
- [endpoint or schema change if needed]

### Implementation Steps (ordered)
1. [step]
2. [step]
...

### Protected Flows — Do Not Touch
- [list the must-protect items from Phase 1]

### Protected Flows — Explicit Guard Instructions
These are the must-protect behaviors identified in Phase 1. Include them in the
Claude Code session protocol as hard stops, not just reminders:
- Before changing any file that touches a protected flow, re-read that flow's
  component, API route, and any related test. Confirm the change does not alter
  the data shape, auth check, or side effects.
- If a change would affect a protected flow, stop and flag it to the user before proceeding.

### Pre-Submit Completeness Checklist
When implementing from this spec, do NOT consider the task done until every item below passes.
Run this check before creating the PR:
- [ ] Responsive layout tested at 375px, 768px, 1280px
- [ ] All sections from selected mockup are present in the implementation
- [ ] Styling matches existing app patterns (card designs, spacing, colors, border-radius)
- [ ] New fields render correctly and validation works
- [ ] Existing protected flows still pass manually (test each one listed above)
- [ ] No console errors on page load or interaction
- [ ] PR description references the selected mockup concept by name
```

### Claude Code Session Protocol

At the top of the implementation plan, include this block formatted as a copy-paste-ready
instruction the user drops into their Claude Code session:

```
---
IMPLEMENTATION SESSION PROTOCOL — [Feature name]
Branch: feature/[branch name]
Selected Design: [Concept name]

BEFORE WRITING ANY CODE:
Read the full data flow for every protected flow listed below:
DB schema → API route → client fetch → component render
Identify exactly what must not change. Do not proceed without confirming this.

PROTECTED FLOWS — DO NOT BREAK:
[List each protected flow from Phase 1 as a bullet]

WHEN IMPLEMENTING FROM THE MOCKUP SPEC:
- Work through the implementation steps in order
- After each step, verify the UI against the mockup before moving on
- Do a completeness check BEFORE submitting or creating a PR:
    verify responsive layout at 375px, 768px, 1280px
    verify all sections from the selected mockup are present
    verify styling matches existing app patterns (cards, spacing, colors)
    verify new fields render and validate correctly
    verify all protected flows still work manually
    verify no console errors on page load or interaction
- Do not consider the task done until this checklist passes

COMMIT MESSAGE FORMAT:
feat([scope]): [what changed] — implements [Concept name] design
---
```

Instruct the user: "Paste the Session Protocol block at the start of your Claude Code
session before sharing the implementation plan. It sets the behavioral guardrails for
the entire implementation."

---

## Phase 5: Test Plan

Append a test plan covering:

**Manual Test Cases**

- Happy path: [describe the full working flow end-to-end]
- New fields: [DOB validation, Location autocomplete, or whatever was specified]
- Protected flow: [existing functionality that must still work]
- Mobile: [key interactions on small screen]
- Edge cases: [empty states, API errors, slow network]

**PASS / FAIL Acceptance Criteria**
Write explicit PASS/FAIL for each test case. Format:

```
TC-01: [description]
PASS: [observable result that means it works]
FAIL: [observable result that means it's broken]
```

**Cross-Platform Checklist**

- [ ] Web (Chrome, Safari)
- [ ] Each native platform the app ships on (e.g. iOS, Android)

---

## Rules

- Phase 0 (branch creation) always runs first, before any reading or design work
- Phase 3 always produces an HTML file — never ASCII art, never a list of descriptions
- Phase 4 and Phase 5 only run after the user has selected a mockup
- The completeness checklist from Phase 4 must be included in the Linear ticket description if one is being written
- When new fields are specified (e.g., Date of Birth, Location/City with autocomplete), mock them realistically in all 5 concepts — don't defer them to implementation
