---
name: bug-bash-linear
description: File bugs and enhancements to Linear from screenshots and descriptions during testing sessions, with diagnose-before-code steps and a copy-paste Claude Code session protocol on every ticket. Use when the user shares a screenshot, describes a bug, says "bug bash", or asks to create a Linear ticket.
---

# Bug Bash: Linear Ticket Filing

Turn screenshots, short descriptions, and raw findings from a testing session into structured,
actionable Linear tickets that a Claude Code session can pick up and fix, **one bug per session**.

Requires the Linear MCP.

## Setup (once per project)

Confirm these with the user at the start of the first session and reuse them after:

| Setting | Example |
|---|---|
| Team | `Product` |
| Project | `Release 1.0` |
| Milestone | `Bug Bash & Go-Live Readiness` (create it if it does not exist, with a description of the one-bug-per-session rule and the "everything green before production" gate) |
| Ticket ID prefix | `ENG-` |
| Platforms every fix must be verified on | web (mobile Safari, mobile Chrome, desktop), iOS, Android |
| Known problem areas | see "Diagnostic phase guidelines" below |

## When to use this skill

- The user shares a screenshot from staging or production with a bug description
- The user asks to "create a ticket" or "file this in Linear"
- The user says "bug bash", "found a bug", or describes unexpected behavior
- The user shares raw Claude Code diagnostic output that needs to become a ticket
- The user wants to update, clarify, or reclassify an existing ticket

## Session behavior

This skill supports **continuous bug bash sessions** where the user finds bugs one after another.
Keep a running tally. After each ticket, close with "Ready for bug #N."

## Step 1: Analyze the input

1. **Read the screenshot carefully.** Note every visible element: URL, user and role, environment
   (staging, production, localhost), device, error messages, UI state.
2. **Identify the bug precisely.** Do not assume what the user is reporting. If the screenshot shows
   several possible issues, describe what you see and let the user confirm which one is the bug.
3. **Note the environment** from the URL bar, device frame, and any environment indicators.
4. **Capture the user's hypothesis.** If they suggest a root cause ("hunch is it's caching the old
   profile"), put it prominently in the ticket.

If anything is ambiguous, ask one clarifying question before filing. Do not guess.

## Step 2: Check for existing tickets

Search before creating: `list_issues` with a keyword query on the configured team.

- **Same bug:** update the existing ticket with the new context. No duplicates.
- **Related but different:** create a new ticket and link it with `relatedTo`.
- **Possible root cause for other bugs:** note the connection in both tickets.

## Step 3: File the ticket

Use `save_issue`:

| Parameter | Value |
|---|---|
| `team` | configured team |
| `project` | configured project (unless told otherwise) |
| `milestone` | configured milestone (unless told otherwise) |
| `priority` | 1 = Urgent (production bugs, workflow blockers), 2 = High (go-live blockers), 3 = Medium |
| `labels` | `["Bug"]` for bugs, `["Feature"]` for enhancements |
| `relatedTo` | ticket IDs that may share a root cause |
| `blockedBy` / `blocks` | ticket IDs for dependency ordering |

### Title format

- Bugs: `[Bug Bash] Short description of what's broken`
- Production bugs from a real user: `[PROD BUG] Short description - reported by [name]`
- Enhancements: `Short description of the improvement`
- Investigations: `INVESTIGATE & IMPLEMENT: Short description`

### Description structure

Every ticket follows this structure. Sections can be shorter for simple bugs, but the structure stays the same.

```markdown
## Summary

[What's broken, in 2-3 sentences. Include the user's hypothesis if they shared one.]

---

## Cross-Platform Requirement

Fix must be verified on: [configured platform list]

---

## Environment

- **URL:** [exact URL from screenshot]
- **User:** [test account or real user]
- **Device:** [what's visible in the screenshot]

---

## Steps to Reproduce

1. [Step-by-step from the description and the screenshot]
2. ...
3. **BUG:** [exact failure point]

---

## Expected Behavior

- [What should happen]

## Actual Behavior

- [What actually happens, with exact error text if visible]

---

## Agent: Claude Code - Diagnostic Phase (MANDATORY before any code changes)

### Step 1: [Specific to this bug: trace the relevant code path]
### Step 2: [Compare or query to identify the failing layer]
### Step 3: [Direct database inspection if relevant]
### Step 4: Implement the fix only after the diagnosis is approved

---

## Acceptance Criteria

- [ ] **PASS:** [Specific passing condition]
- [ ] **PASS:** Verified on each configured platform
- [ ] **FAIL:** [Specific failing condition]
- [ ] **FAIL:** Fix works on one platform but not the others

---

## Test Cases (Cross-Platform)

| # | Test | Expected | Platform |
|---|------|----------|----------|
| 1 | ... | ... | all |
```

### Diagnostic phase guidelines

The diagnostic steps are the most important part of the ticket. They must be **specific to this bug**,
never generic. Always follow the data path: DB schema -> API route -> client fetch -> component render.

Keep a short list of **known problem areas** for the project and add a caution note when a bug touches
one. Examples of the kind of note that pays off:

- **Image upload and display bugs:** "These take several rounds when diagnosis is skipped. Trace the full
  upload path before writing any code."
- **Wrong-record bugs:** "Check whether the wrong profile or record type is being resolved, and which
  one should win."
- **Row-level security bugs:** "Inspect the exact policy on the table. Query as the authenticated user to reproduce."
- **Permission checks:** "Check whether two distinct roles are being treated as synonyms, for example a
  team role versus the record's creator."

## Step 4: Add the Claude Code Session Protocol comment

After filing, add a comment with copy-paste-ready instructions (`save_comment`):

```
## Claude Code Session Protocol

**Paste this when starting the Claude Code session for this bug:**

---

Let's focus on ONE issue this session: **[specific bug description for this ticket].**

Before writing any code to fix this bug, I want you to:
1. Read the relevant code path end-to-end (DB schema -> API route -> client fetch -> component render) for [specific components/paths]
2. Identify exactly which layer has the bug and WHY: [specific comparison or query]
3. Present your diagnosis for my approval. Only then write the fix.

Do not move on to other bugs.

---

**Remember:** the fix must be verified on every configured platform.
```

**Important:** `save_comment` needs the issue's **full UUID** from the `save_issue` response, not the display ID.

## Step 5: Confirm and keep the tally

After filing, respond with:
1. The ticket ID and link
2. A one-line summary of what was filed
3. The updated tally table (multi-bug sessions)
4. "Ready for bug #N."

```
| # | Ticket | Issue | Status |
|---|--------|-------|--------|
| 1 | ENG-180 | Profile page missing current venues | Backlog |
| 2 | ENG-181 | Tab layout broken on mobile | Backlog |
```

## Handoff prompt generation

When the user wants a prompt to share with a teammate or co-founder:

1. **Keep it copy-paste ready.**
2. **Put the session rules first** (the one-bug-per-session diagnostic protocol).
3. **Order bugs strategically.** If one bug may cause others, mark it "START HERE" and say to re-check the dependent bugs after fixing it.
4. **Link each ticket** so whoever runs the session reads the full context.
5. **Mark bugs a root-cause fix may already have solved** with "verify before starting a dedicated session."

### Handoff prompt template

```
**Bug Bash & Go-Live Readiness -- [Project Name] Release [X]**

These [N] bugs are blocking staging -> production. Each has a full Linear ticket with screenshots,
repro steps, and acceptance criteria. Work them **one bug per session**.

---

**Session rules (paste at the start of every session):**

> Let's focus on ONE issue this session: [bug description below]. Before writing any code, 1) read the
> relevant code path end-to-end (DB schema -> API route -> client fetch -> component render), 2) identify
> exactly which layer has the bug and WHY, 3) present your diagnosis for my approval. Only then write the
> fix. Do not move on to other bugs. Verify every fix on [platform list].

---

**START HERE -- likely root cause for N bugs:**

1. **[ID] -- [Title]** (Urgent)
[Linear URL]
[One-line description with hypothesis]

**Then work these independently:**

2. **[ID] -- [Title]** (Priority)

**These may already be fixed by [ID] -- verify before starting a dedicated session:**

N. **[ID] -- [Title]** (Priority)
```

## Agent team handoff

When the user wants tickets grouped for parallel agent work:

1. **Group by coupling:** tickets touching the same files or features go in the same track.
2. **Identify dependencies:** note which tickets block others.
3. **Name tracks clearly:** "Track A: Admin and permissions", "Track B: Guest experience".
4. **Give a session count per track** so the user can estimate effort.
5. **Add a pre-flight block** to each prompt:

```
BEFORE WRITING ANY CODE for this session:

1. Run: git log --oneline -20 to see recent commits on this branch
2. Search for any existing implementation of the feature/fix described below
3. Check for open or recently merged PRs touching the same files
4. Read the relevant files before concluding anything is missing or broken

If the functionality already exists (fully or partially):
- Report what you found and what state it's in
- Do NOT re-implement working code
- Only implement what is genuinely missing or broken
```

## Ticket updates

When the user has new information about an existing bug:

1. Pull the current ticket with `get_issue`.
2. Update with `save_issue` (`id` = UUID) and only the changed fields, or add a `save_comment` with the new findings.

For bulk status updates, pull current state first with `list_issues` to avoid working from stale data.

## Known Linear MCP constraints

- **Screenshots cannot be attached through the API** (the base64 payload is too large). Describe what the
  screenshot shows in the ticket and ask the user to attach it manually.
- **Linear markdown can mangle tables** saved through the API. Check rendering in the browser after saving.
- **Custom states may not exist.** If a state like "On Hold" is not configured, park the ticket with a comment.
- **`save_comment` sometimes hits approval gates or connection drops.** If it fails, give the user the comment text to paste.
- **`list_issues` with a state filter can be unreliable.** Prefer keyword queries or direct `get_issue` calls.
- **`list_issues` with a milestone parameter** returns cleaner results than filtering by project, then milestone.
- **If the Linear API is down,** draft the full ticket in chat so the user can create it manually. Never block the session on it.

## Do NOT

- Invent specifics the user has not given (names, error codes, file paths)
- Write generic diagnostic steps; every diagnostic section is specific to the bug
- File duplicates without searching first
- Treat two distinct roles as synonyms in permission checks
- Use em dashes in any output
- State market sizes, growth rates, or "studies show" claims without a named, verifiable source
