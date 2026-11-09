# social-campaign

Turn a real event or dataset into a multi-channel social campaign: pull defensible numbers, find one
honest insight, draft posts per channel in your brand voice, and schedule them as CRM tasks.

**Why it exists:** AI-written social copy fails when it is ungrounded or overclaims. This workflow
makes every post trace back to a number and checks copy against guardrails (no overclaiming, credit
sources, no surveillance tone) before anything is scheduled.

- **Needs:** Claude Code and a `VOICE.md` (the skill will help you write one). Optional: a CRM MCP (Attio, HubSpot) for scheduling; without one, use dry-run mode and get a markdown calendar.
- **Pairs with:** [`readonly-db-query`](../readonly-db-query) to pull internal stats safely.
- **Install:** copy this folder to `~/.claude/skills/social-campaign/`.
- **Try it:** "We just finished our launch week. Turn the attendance data into a two-week campaign, dry-run."
