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

## Set up your own bug bash chat (about 5 minutes)

The workflow itself is [`SKILL.md`](SKILL.md). This is how to run it the way I did, in a Claude chat:

1. **Connect Linear to Claude.** In Claude (claude.ai or the desktop app), open Settings, then
   Connectors, and connect Linear.
2. **Create a Claude project** called something like "Bug Bash".
3. **Paste the contents of [`SKILL.md`](SKILL.md) into the project's Instructions.**
4. **Start a chat in that project** and tell it where tickets go, for example:
   *"Our Linear team is Product, the project is Release 1.0. Create a Bug Bash & Go-Live Readiness
   milestone if it doesn't exist. We ship on web, iOS, and Android."*
5. **Start testing.** Whenever you find something, drop a screenshot and a sentence in the chat:
   *"Bug bash: the save button does nothing on my phone."* Claude files the ticket and replies
   "Ready for bug #2."

When it's time to fix, open each ticket's "Claude Code Session Protocol" comment, paste it into a
fresh Claude Code session, and work that one bug.

**Prefer Claude Code for intake too?** Copy this folder to `~/.claude/skills/bug-bash-linear/`
with the Linear MCP connected, and use the same prompts.

See it in context: [case study](../../case-studies/bug-to-ship-pipeline.md).
