# bug-bash

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
- **Claude turns it into a complete ticket in the tool your team already uses** (Linear, Jira, Azure DevOps,
  GitHub Issues, and others): what's broken, how to reproduce it, what "fixed"
  looks like (clear pass/fail checks), and which devices to verify on. It checks for duplicates first.
- **Every ticket comes with its own focused session instructions**: work on this one bug only, find
  the cause and get approval before changing anything, and don't drift into other issues.
- **The fixing session stays clean.** One bug, one session, one change to review.

It also keeps a running tally during a test pass, flags which bug is probably causing others ("start
here"), and writes a ready-to-send handoff for a teammate.

## When to use it

- **Before a launch or release**, when you're testing every flow and finding more than one problem at a time.
- **During any fixing session** where you spot something unrelated: park it here instead of adding it to the current session.
- **When the person testing isn't the person fixing,** so the bug report needs to stand on its own.

## Who it's for

Product managers, founders, QA testers, and anyone who tests software and works with AI coding
agents or developers to get it fixed.

## Set up your own bug bash chat (about 5 minutes)

The workflow itself is [`SKILL.md`](SKILL.md). This is how to run it the way I did, in a Claude chat:

1. **Connect your tracker to Claude.** In Claude (claude.ai or the desktop app), open Settings, then
   Connectors, and connect Linear, Jira, Azure DevOps, or whichever tool your team uses. No tracker?
   Skip this step and the skill writes tickets to a file you can paste in later.
2. **Create a Claude project** called something like "Bug Bash".
3. **Paste the contents of [`SKILL.md`](SKILL.md) into the project's Instructions.**
4. **Start a chat in that project.** On the first run it finds your connected tracker and asks where
   tickets should go. Answer in plain words, for example:
   *"Use Jira, project Product, for the Release 1.0 version. Group these under a Bug Bash & Go-Live
   Readiness epic. We ship on web, iOS, and Android."*
5. **Start testing.** Whenever you find something, drop a screenshot and a sentence in the chat:
   *"Bug bash: the save button does nothing on my phone."* Claude files the ticket and replies
   "Ready for bug #2."

When it's time to fix, open each ticket's "Session Protocol" comment, paste it into a
fresh Claude Code session, and work that one bug.

**Prefer Claude Code for intake too?** Copy this folder to `~/.claude/skills/bug-bash/`
with your tracker's MCP connected, and use the same prompts.

## How I used it

I built this while getting a hospitality platform (web, iOS, Android) ready for real users. I tested
as a business user, dropped every finding into the bug bash chat, and worked the tickets one per
Claude Code session.

- **Finding and fixing were separate jobs.** I owned the bug bash chat, the ticket format, and the
  Linear setup. My co-founder, Samuel Rivera, built the Claude Code skill that picked up a ticket and
  carried it to a pull request.
- **The plan for finding the cause lived in the ticket,** so each fixing session started from a plan
  instead of a guess.
- **Repeat trouble spots got warnings.** Photo uploads, the wrong profile showing up, data permissions,
  and user roles kept breaking, so tickets touching them carried an extra caution note.
- **I ran it on Linear.** [`references/linear.md`](references/linear.md) holds what I learned about
  Linear specifically. For other trackers the workflow is the same, and you can add a reference
  file with what you learn.
- **It was used, not just designed:** 44 of my commits to the platform reference a Linear ticket.

<!-- TODO: add one real example, scrubbed (no company or user names, no ticket IDs): the screenshot
     and sentence you dropped in, the ticket it became, and what the fix was. -->

## What I'd change

<!-- TODO: your honest take. For example: attach screenshots automatically, or have the fixing
     session post its diagnosis back to the ticket so the loop closes on its own. -->
