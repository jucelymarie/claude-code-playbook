# Claude Code Playbook

I build AI agent workflows that do real work: filing and fixing bugs, shipping client sites,
and running grounded marketing campaigns. I came to this from sales and marketing automation,
and co-founded and shipped a hospitality platform (web, iOS, Android) with Claude Code.

This repo is for people who are **new to vibe coding** (building software by describing what you want
to an AI). These are the habits I wish I'd had on day one, packaged as skills you can install and use
right away. Each one fixes a mistake AI coding agents make when nobody tells them otherwise.

## New here? Start with these three ideas

- **Claude Code** is an AI assistant that works inside your project: it reads your files, writes code,
  and runs commands when you ask. You talk to it in plain language.
- **A skill** is a saved set of instructions Claude follows for a certain kind of task, like a
  checklist an expert would hand a new teammate. Once a skill is installed, Claude uses it on its own
  when your request matches. You don't have to remember to ask.
- **A connector (also called an MCP)** lets Claude use another tool for you, like Linear, Jira,
  Webflow, or your CRM. Some skills need one; each skill's page says which.

## The skills

### Taste: planning and design judgment

| Skill | The mistake it prevents |
|---|---|
| [`ui-design-review`](taste/ui-design-review) | The agent builds the first screen idea it has, puts buttons in new places, and invents new styles. This shows you 5 options that stay consistent with your app, and nothing gets built until you pick one. |
| [`designer-first-site-build`](taste/designer-first-site-build) | The agent hard-codes a website so nobody can edit it in Webflow (or any visual builder). This keeps everything editable in the builder. |

### GTM: AI pointed at revenue work

| Skill | The mistake it prevents |
|---|---|
| [`social-campaign`](gtm/social-campaign) | AI-written posts full of claims you can't back up. Every post here traces back to a real number. |
| [`readonly-db-query`](gtm/readonly-db-query) | Letting an agent loose on your live database. This one can only read, and only from the database you name. |

### Workflows

| Skill | The mistake it prevents |
|---|---|
| [`bug-bash`](workflows/bug-bash) | Piling every bug you find into one session until the agent loses track and breaks things. Park new bugs as tickets in Linear, Jira, or your tracker, and fix one at a time. |

**Not sure where to start?** Try `ui-design-review` next time you want a screen changed, or
`bug-bash` the next time you test your app. Neither needs anything extra connected.

## Install a skill

**Easiest way:** open Claude Code in your project and paste:

> Install the ui-design-review skill from https://github.com/jucelymarie/claude-code-playbook into my Claude Code skills folder.

Swap in the name of any skill above. Claude downloads it and puts it in the right place.

**Prefer to do it yourself?** In a terminal:

```bash
git clone https://github.com/jucelymarie/claude-code-playbook.git
cp -r claude-code-playbook/taste/ui-design-review ~/.claude/skills/
```

Then just ask for the task in plain language. Each skill's page has an example request to try.

## The habits behind these skills

- **Look before you build.** See mockups before code, a diagnosis before a fix, a schedule before posts go out.
- **Make mistakes hard.** The database skill refuses the wrong database; the campaign skill refuses claims without a number.
- **One thing at a time.** Short, focused sessions with one goal go better than long ones that wander.
- **Write down what went wrong.** When a tool surprises you, add it to the skill so nobody hits it twice.

## License

MIT. Copyright (c) 2026 Jucely Marie Rivera.
