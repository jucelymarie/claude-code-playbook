---
name: designer-first-site-build
description: Build or edit a website in a visual site builder (Webflow, Framer, Wix, Squarespace, WordPress page builders, and similar) through an MCP so the result is editable by the client in the builder's own editor, not hard-coded. Use whenever an agent builds pages, sections, styles, or content in a visual builder via its API or MCP. Includes a field-tested Webflow reference.
---

# Designer-first site builds

**Default failure to avoid:** coding agents reach for custom code. They inject HTML through embeds,
paint the layout with scripts, hard-code text and prices, and style things with injected CSS. The site
looks right in the browser, but the client opens the visual editor and finds a blank or broken canvas,
text they can't change, and a site only a developer can maintain.

**Rule:** build the way a skilled designer would in the builder's own editor. Everything a client
might want to change lives as a native element, style, or content entry. Code is the exception, used
only for behavior the builder cannot do natively, and documented when used.

## Before building

1. **Identify the builder** and load its reference file from `references/` if one exists
   (`references/webflow.md` is field-tested). If none exists, spend the first step learning the MCP's
   real shapes: read its tool list, make one small test call, and read error messages closely.
2. **Ask what the client will edit.** Typical answers: text, photos, menus or price lists, events,
   team members, hours, blog posts. Each of those must be editable without code.
3. **Map content to native structures.** Repeating items (menu items, events, services, people)
   become CMS or collection entries, not copied blocks. One-off text becomes native text elements.

## Build rules

- **Native elements first.** Sections, headings, paragraphs, images, links, buttons, and forms are
  created as the builder's own elements, never as an HTML embed.
- **Styles live in the builder's style system** (classes, variables, design tokens) so the client
  can see and adjust them in the editor. Prefer reusable classes over one-off inline styling.
- **Content lives in the CMS or collections** whenever it repeats or changes, bound to native
  elements. Prices and labels are typed by the client as plain text, not computed by code.
- **Images are swappable in the editor.** Prefer background images or image elements the client can
  replace over images baked into code.
- **Scripts carry behavior only** (an interaction, a form enhancement, a third-party widget), never
  layout or content. Keep each script small, named, versioned, and listed in a handoff note.
- **The editor view must match the published site.** If something only appears after a script runs,
  the client cannot see or edit it. Treat that as a bug.

## Verify like the client will

- Check the **published output** after each batch of changes, not just the API response. Some APIs
  report success while silently ignoring a setting; always re-read.
- Open the page in the **builder's editor** and confirm every element the client should edit is
  visible and editable there.
- Keep a snapshot (published HTML/CSS or exported content) per batch so regressions can be diffed.
- Use **one writer at a time** against the builder's API, whether agent or person. Concurrent writes cause partial updates.

## When native is impossible

Every builder has hard limits (things its API cannot create, settings it ignores, caps on lists).
When you hit one:

1. Confirm it is a real limit by re-reading the result, not just the response message.
2. Choose the smallest workaround: a manual step for the client in the editor, guided by clear
   instructions, beats a script that hides content from the editor.
3. Write the limit into this skill's reference file for that builder so the next build does not
   rediscover it.

## Handoff

Leave the client a short note: what they can edit and where, which parts are scripts (and what each
one does), and any manual steps the API could not do.

## Adding a new builder

Create `references/<builder>.md` with: the MCP's exact working call shapes, silent failures, hard
platform limits, and patterns that kept the site editable. Only record what you observed on a real build.
