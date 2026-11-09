# Claude Code Playbook

<!-- DRAFT OPENER: rewrite these three sentences in your own voice before publishing. -->
I build AI agent workflows that do real work: filing and fixing bugs, shipping client sites,
and running grounded marketing campaigns. I came to this from sales and marketing automation,
and co-founded and shipped a hospitality platform (web, iOS, Android) with Claude Code.
I'm looking for an AI solutions / applied-AI role where I build these systems with and for customers.

These are the Claude Code skills I wrote and used in production, with company and client details
removed so they work in any project.

## Skills

### Taste: planning and design judgment

| Skill | What it does |
|---|---|
| [`ui-design-review`](taste/ui-design-review) | Audits a screen, renders 5 distinct mockups in one interactive HTML file, and blocks implementation until you pick one |
| [`webflow-native-build`](taste/webflow-native-build) | Field-tested Webflow MCP playbook: exact tool-call shapes, silent failures, hard limits, client-editable patterns |

### GTM: AI pointed at revenue work

| Skill | What it does |
|---|---|
| [`social-campaign`](gtm/social-campaign) | Real data to one honest insight to channel-specific posts, scheduled as CRM tasks (or dry-run) |
| [`readonly-db-query`](gtm/readonly-db-query) | Pull a stat from production safely: SELECT-only, host-guarded, with a self-test |

### Workflows

| Skill | What it does |
|---|---|
| [`bug-bash-linear`](workflows/bug-bash-linear) | Screenshot + sentence to a Linear ticket with diagnose-before-code steps and a one-bug-per-session protocol |

## Case study

- [From screenshot to merged fix: a bug-bash pipeline with Claude and Linear](case-studies/bug-to-ship-pipeline.md)

## Install a skill

```bash
git clone https://github.com/jucelymarie/claude-code-playbook.git
cp -r claude-code-playbook/taste/ui-design-review ~/.claude/skills/
```

Then ask Claude Code for the task in plain language (each skill's README has an example prompt).

## Design principles across these skills

- **Gate before you build.** Mockups before code, diagnosis before fixes, a proposed schedule before bulk CRM writes.
- **Fail closed.** The database skill refuses the wrong host; the campaign skill refuses claims without a number.
- **One thing per session.** Focused agent sessions beat long ones that drift.
- **Write down what the platform got wrong.** Hard-won quirks go in the skill so nobody pays for them twice.

## License

MIT. Copyright (c) 2026 Jucely Marie Rivera.
