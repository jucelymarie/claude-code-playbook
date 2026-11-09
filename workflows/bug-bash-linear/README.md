# bug-bash-linear

**A parking lot for bugs, so every fix stays focused.**

When you test a product as a business user, you find problems in bunches. You're checking one thing
and you notice three others along the way. If you hand all of them to whoever is fixing the first one,
person or AI agent, they lose track of the original job, mix fixes together, and break things that
were working.

I saw this with developers long before AI: give someone an assigned bug, then mention "oh, and I also
found this," and the focus is gone. AI coding agents behave the same way.

This skill fixes the workflow, not the code:

- **While testing, drop anything unrelated into a separate "bug bash" chat** with a screenshot and a
  sentence. You don't have to write a ticket or know the cause.
- **Claude turns it into a complete Linear ticket**: what's broken, how to reproduce it, what "fixed"
  looks like (clear pass/fail checks), and which devices to verify on. It checks for duplicates first.
- **Every ticket comes with its own focused session instructions**: work on this one bug only, find
  the cause and get approval before changing anything, and don't drift into other issues.
- **The fixing session stays clean.** One bug, one session, one change to review.

It also keeps a running tally during a test pass, flags which bug is probably causing others ("start
here"), and writes a ready-to-send handoff for a teammate.

## Who it's for

Product managers, founders, QA testers, and anyone who tests software and works with AI coding
agents or developers to get it fixed.

## Setup

- **Needs:** Claude (chat or Claude Code) with the Linear connector.
- **Install:** paste `SKILL.md` into a Claude project's instructions, or copy this folder to `~/.claude/skills/bug-bash-linear/`.
- **Try it:** share a screenshot and say "bug bash: the save button does nothing on my phone."

See it in context: [case study](../../case-studies/bug-to-ship-pipeline.md).
