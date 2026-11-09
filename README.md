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
| [`ui-design-review`](taste/ui-design-review) | A design review for every UI change or new screen: 5 different options to compare in your browser, and nothing gets built until you pick one |
| [`designer-first-site-build`](taste/designer-first-site-build) | Keeps AI-built websites editable by the client: native elements and CMS content instead of hard-coded pages, for Webflow or any visual builder (Webflow notes field-tested) |

### GTM: AI pointed at revenue work

| Skill | What it does |
|---|---|
| [`social-campaign`](gtm/social-campaign) | Real data to one honest insight to channel-specific posts, scheduled as CRM tasks (or dry-run) |
| [`readonly-db-query`](gtm/readonly-db-query) | Pull a stat from production safely: SELECT-only, host-guarded, with a self-test |

### Workflows

| Skill | What it does |
|---|---|
| [`bug-bash-linear`](workflows/bug-bash-linear) | A parking lot for bugs found while testing: drop in a screenshot and a sentence, get a complete ticket, and keep every fixing session on one bug |

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
