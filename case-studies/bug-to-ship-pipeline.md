# From screenshot to merged fix: a bug-bash pipeline with Claude and Linear

<!-- DRAFT: facts are filled in; the sections marked TODO need your voice and one real example. -->

## The problem

Before launching our hospitality platform to real users, I tested every flow as a business user and
had to clear every bug blocking the move to production. Testing one thing, I'd find three others.

I'd seen what happens next with developers long before AI: someone has an assigned bug, you mention
"I also found this," they start on it, lose track of the original job, and break something that worked.
AI coding agents behave the same way. Every unrelated bug I added to a fixing session muddied the
context and made it more likely the agent would fix the wrong thing.

So I separated *finding* bugs from *fixing* them. Anything unrelated went into a bug bash chat, and
each fixing session got exactly one bug.

## What I built

A three-step pipeline where each step has one job:

1. **Intake (Claude chat + Linear MCP).** I tested staging and dropped in a screenshot and a sentence.
   Claude created a "Bug Bash & Go-Live Readiness" milestone, checked for duplicates, and filed a
   structured ticket: repro steps, expected vs. actual, PASS/FAIL acceptance criteria,
   cross-platform test cases (web, iOS, Android), and **diagnostic steps specific to that bug**.
   That workflow is now the [`bug-bash-linear`](../workflows/bug-bash-linear) skill, with
   [setup steps](../workflows/bug-bash-linear/README.md#set-up-your-own-bug-bash-chat-about-5-minutes)
   for running your own bug bash chat.
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
