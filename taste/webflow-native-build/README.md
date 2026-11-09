# webflow-native-build

A field-tested playbook for building and editing Webflow sites through the Webflow MCP Data API:
the exact tool-call shapes that work, schema quirks that fail silently, hard platform limits, and
patterns that keep sites editable by the client in the Designer.

**Why it exists:** the Webflow API drops fields without errors, ignores some settings while returning
success, and caps things you only find out about at write time. Each of those cost real time once.
This file is so the next build does not rediscover them.

- **Needs:** Claude Code with the Webflow MCP connected.
- **Install:** copy this folder to `~/.claude/skills/webflow-native-build/`.
- **Try it:** "Build a CMS-driven services page in Webflow with categories and a jump bar."
- **Core principle:** everything visual lives as native Designer styles, elements, and CMS bindings, so the Designer matches the published site and the client can edit it. Scripts carry behavior only.
