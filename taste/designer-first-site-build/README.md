# designer-first-site-build

**Build websites with AI that your client can still edit.**

When you ask an AI coding agent to build a site in a visual builder like Webflow, it defaults to what
it knows best: writing code. It hard-codes text, injects layouts with scripts, and styles everything
in custom code. The site looks finished in the browser. Then the client opens the editor to change a
price or swap a photo and finds nothing they can touch. Every small change now needs a developer.

This skill makes the agent work the way a good designer would inside the builder:

- **Everything the client might change is built natively** in the editor: text, images, sections, styles.
- **Repeating content goes in the CMS** (menus, events, services, team), so the client adds and
  reorders items like any other entry.
- **Code is only for behavior** the builder can't do on its own, kept small and listed in a handoff note.
- **The agent checks its work the way the client will:** in the editor and on the published site,
  not just in the API response.
- **When the platform can't do something natively,** the agent writes it down, so the next build doesn't hit the same wall.

## When to use it

Any time an AI agent builds or edits a site in a visual builder through an MCP or API: Webflow,
Framer, Wix, Squarespace, WordPress page builders, and similar.

## Who it's for

Freelancers and agencies delivering client sites with AI, and founders building their own marketing
site who want to keep editing it themselves.

## What's inside

- [`SKILL.md`](SKILL.md): the designer-first rules, for any builder.
- [`references/webflow.md`](references/webflow.md): field-tested notes from a production Webflow build,
  covering the exact requests that work, settings the API silently ignores, hard platform limits, and
  patterns that kept the site client-editable.

Webflow is the platform I tested on. For other builders the rules still apply. Add a
`references/<builder>.md` with what you learn.

## Setup

- **Needs:** Claude Code with your site builder's MCP connected (for example the Webflow MCP).
- **Install:** copy this folder to `~/.claude/skills/designer-first-site-build/`.
- **Try it:** "Build a services page in Webflow with categories the client can edit in the Designer."
