# From screenshot to merged fix: a bug-bash pipeline with Claude and Linear

<!-- DRAFT: facts are filled in; the sections marked TODO need your voice and one real example. -->

## The problem

Before launching our hospitality platform to real users, we had to clear every bug blocking the move from staging to
production. Bugs were turning up in screenshots, texts, and memory, and our Claude Code fix sessions
tended to drift: an agent would start on one bug, patch the wrong layer, and wander into a second one.

<!-- TODO: one or two sentences in your words on what that cost (rework, a fix that broke another platform, etc.). -->

## What I built

A three-step pipeline where each step has one job:

1. **Intake (Claude chat + Linear MCP).** I tested staging and dropped in a screenshot and a sentence.
   Claude created a "Bug Bash & Go-Live Readiness" milestone, checked for duplicates, and filed a
   structured ticket: repro steps, expected vs. actual, PASS/FAIL acceptance criteria,
   cross-platform test cases (web, iOS, Android), and **diagnostic steps specific to that bug**.
   That workflow is now the [`bug-bash-linear`](../workflows/bug-bash-linear) skill.
2. **Handoff.** Every ticket got a copy-paste "session protocol" comment: one bug only, trace the data
   path (DB schema -> API route -> client fetch -> component render), present a diagnosis, wait for
   approval, then fix. For batches, Claude ordered tickets by likely root cause ("START HERE") and grouped
   them into parallel agent tracks.
3. **Pickup (Claude Code).** A Claude Code skill read the ticket and carried it to a pull request.
   My co-founder, Samuel Rivera, built that pickup skill; I designed the intake, the ticket format,
   and the Linear integration.

## Why it worked

- **The diagnosis lives in the ticket,** so the coding agent starts from a plan instead of a guess.
- **One bug per session** keeps the agent from mixing fixes and makes each PR easy to review.
- **Known problem areas get caution notes.** Image uploads, wrong-record resolution, row-level security, and
  role checks were the areas that kept breaking, so tickets touching them carried an extra warning.
- **Tool limits are written down.** Screenshots can't attach through the API, and some filters
  return unreliable results, so the skill works around them instead of failing mid-session.

## Results

- 44 of my commits to the platform reference a Linear ticket, so the loop was used, not just designed.

<!-- TODO: add one real ticket, scrubbed (no company or user names, no ticket IDs), traced from
     screenshot -> ticket -> diagnosis -> merged fix. That single example is the strongest part of this page. -->

## What I'd change

<!-- TODO: your honest take. For example: auto-attach screenshots through a storage link, or close
     the loop by having the pickup skill post the diagnosis back to the ticket. -->
