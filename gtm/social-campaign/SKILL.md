---
name: social-campaign
description: Turn a real event or dataset into a grounded, multi-channel social content campaign. Pull defensible numbers, find one honest insight, draft platform-specific copy in the brand voice, schedule each post as a CRM task (or a markdown calendar in dry-run mode), and ship a guide doc. Use whenever the user wants social content, a content calendar, or to turn an event or data drop into posts for Instagram, X, TikTok, or LinkedIn.
---

# Social Campaign

Turn a real event or dataset into a grounded, multi-channel social campaign. The output is
ready-to-post copy, a scheduled calendar, and a guide doc the team can work from.

## Inputs

- **`VOICE.md`** (in the project root or passed by the user): brand voice, words to avoid,
  formatting rules. If it is missing, ask for three adjectives and three things the brand never says,
  then write a short `VOICE.md` before drafting.
- **Audience**: broad awareness, industry peers/operators, or investor/founder narrative. Voice shifts per audience.
- **Grounding source**: a real event, an internal stat, or an external dataset.
- **Scheduling target**: a CRM MCP (Attio, HubSpot, etc.) or `dry-run` (writes the calendar to markdown).

## Guardrails (non-negotiable)

- **Every claim has a number behind it.** Store the supporting count next to the claim so it holds up in replies.
- **Usage-grounded.** Do not promise network effects or features the product cannot back yet.
- **Say what you actually did.** If you listed or mapped something, do not imply you hosted or own it.
- **Credit sources warmly.** Never dunk on a peer, a community list, or a competitor.
- **No surveillance tone.** Never cite a specific person's social or in-app activity in public or outreach copy.
- **Follow `VOICE.md`** over any default style, including punctuation rules.

## Step 1: Ground it in real numbers

Pull a defensible stat before writing a word.

- For internal data, use the `readonly-db-query` skill (read-only, environment-guarded).
- Cross-check against an external source when one exists (a community sheet, a ticketing export).
  Spreadsheets can be parsed locally; multi-tab xlsx parses with Python `zipfile` + `xml.etree`, no extra libraries.
  Do not edit sources the user does not own.
- Write down the raw counts. They go in the guide doc.

## Step 2: Find the one honest insight

Reduce the data to a single line a peer would recognize and share. Prefer a shared frustration or a
surprising stat over a self-congratulatory metric. Pressure-test it against the guardrails before it
becomes the campaign spine.

## Step 3: Draft the post set

- **Hook carousel** (5-6 slides): name the problem, show the mess, turn to the product, call to action. The anchor post.
- **Stat graphic**: one surprising, defensible number. Tag the relevant platform or peer for a reshare.
- **Feature-per-post series** (short screen recordings): one feature per post, starting with the one that closes the insight's loop.
- **Founder LinkedIn post** (first person): "I pulled the data and here's what surprised me." Credit sources, stay humble, end with a question.

## Step 4: Repurpose across channels

- **Instagram**: broad-awareness primary (carousel, stat, short videos).
- **X**: the stat fits best (hook first, tag peers); the carousel insight becomes a short thread. Confirm handles before tagging.
- **TikTok**: the short videos drop in 1:1 (swap "link in bio" for an on-screen call to action).
- **LinkedIn**: the company page is home base (fill About, logo, banner first); the founder profile is the megaphone
  (post natively, link in the first comment, reshare from the company page).

## Step 5: Schedule

**With a CRM MCP:** one task per post.
- Confirm the workspace and members with the CRM's identity and member-list tools. Ask who owns posting.
- Default cadence: 2 posts per week unless told otherwise.
- Use ISO 8601 UTC deadlines at midday UTC so the date lands correctly across US time zones.
- Put the guide-doc section and channel in each task body.
- Propose the dated schedule and get a yes before creating a large batch.

**Dry-run:** write the same schedule as a markdown table (date, channel, post, owner) in the guide doc.

## Step 6: Document and ship

Write the campaign to `docs/marketing/<name>-guide.md` with: the insight, the data (with numbers),
voice notes, every post's copy and hashtags, the master schedule, the channel matrix, and open items.
Ship it through the project's normal review process.
