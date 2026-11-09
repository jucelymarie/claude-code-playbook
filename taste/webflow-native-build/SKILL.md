---
name: webflow-native-build
description: Build and edit Webflow sites natively via the Webflow MCP Data API — element/style/CMS/component schema quirks, binding keys, collection-list filters, hard platform limits, and proven patterns (fixed banner frames, CMS-driven catalogs, heading rows). Use whenever doing substantial Webflow MCP work so known traps aren't rediscovered.
---

# Webflow native builds via the MCP Data API

Field-tested playbook from a production client build. Core principle: everything visual lives as
native Designer styles/elements/CMS bindings so Designer === preview and clients can edit;
scripts carry behavior only. The Designer canvas does NOT run footer scripts or custom code —
anything script-injected is invisible there.

## Tool-call schema quirks (exact shapes that work)

- Action entries are `{"label": "...", "<action_name>": {...}}`. Zod errors enumerate the real
  keys — read the error paths to learn shapes instead of guessing twice.
- `data_style_tool update_style` takes `style_name` (not `name`). `create_style` combo classes:
  `parent_style_names: [...]`. Font/size via variables: `variable_as_value: "variable-<id>"`
  (a STRING, not an object).
- `data_element_tool move_element`: `anchor_element_id` + `creation_position` (append/prepend/
  before/after). `set_link`: `{id, linkType: "url", link: "/path"}`. `set_heading_level`:
  `{id, heading_level: N}`.
- `data_element_settings_tool`:
  - `get_settings {type: "all_raw_settings", element_id}` to discover an element's setting keys.
  - `set_settings {operations: [{element_id, settings: [{key, static_text|static_number|
    static_json|binding|...}], scope_component_id?}]}` — each setting needs EXACTLY ONE value kind.
    `static_text` is `{value: "..."}`; `static_json.value` must encode a JSON object/array STRING;
    numbers use `static_number: {value: N}`.
  - `set_visibility {element_id, static_value: false}`.
  - `set_dom_id {element_id, static_value: "my-id"}` (empty string invalid — ids can't be cleared).
- `data_cms_tool`: `get_collection_list {siteId}`, `get_collection_details {collection_id}`,
  `list_collection_items {collection_id, limit, offset}`,
  `create_collection_items {collection_id, request: {fieldData: [{...}, ...]}}` (ARRAY of
  fieldData objects), `update_collection_items {collection_id, request: {items: [{id, fieldData}]}}`,
  `publish_collection_items {collection_id, request: {itemIds: [...]}}`.
  Image fields accept `{url: "<hosted asset url>"}` — Webflow re-ingests the file.
- Components: pass `scope_component_id` on element/settings actions to address elements inside a
  component definition (the element id's `component` field is the component id). `query_elements`
  queries accept it per-query. Without it, lookups walk the page tree and return "Element not found".
- `query_styles` name filters are BROKEN (returns everything). Use `update_style` directly
  (errors if missing) or grep the published CSS.
- Expect 429s on bursts and publish: wait 45–60s and retry. Batch aggressively — one tool call
  can carry 40–60 actions/operations.

## Element builder realities

- `element_builder` action: `{build_label, parent_element_id, creation_position, element_schema}`.
  Valid types include DivBlock/Section/Heading/Paragraph/TextLink/Image/CMSCollection ("CollectionList"
  is NOT a type).
- Nested `children` build STRUCTURE ONLY: `text`, `styles`, `link`, and `heading_level` in schemas
  are silently DROPPED. Always follow up with set_text / set_style / set_link / set_heading_level.
- Bare DivBlock and TextBlock reject `set_text` (no String child). Use Paragraph or Heading for
  any element that needs settable text.
- CMSCollection must be built EMPTY (children error: "can not be placed in a Collection List
  Wrapper"), then: wrapper id +1 = DynamoList, +2 = DynamoItem, +3 = DynamoEmpty (hex arithmetic
  on the last id segment is reliable). Build card content into the DynamoItem; hide the
  DynamoEmpty via set_visibility.
- Headings always come out h1 regardless of heading_level — fix with set_heading_level.

## Collection lists: source, filter, sort, limit

Configure the DynamoWrapper via set_settings:
- `source`: `static_json` `{"collectionId": "<id>"}` — errors as "expected { collectionId } or null".
- `sort`: `static_json` `[{"fieldSlug": "sort-order", "direction": "ascending"}]` (direction is
  ascending/descending, field addressed by SLUG).
- `limit`: `static_number` (static_json rejects bare numbers). HARD CAP 100 items per list.
- `filters`: `static_json` array. Operator grammar BY FIELD TYPE — reference (itemRef): `equals` /
  `doesNotEqual` / `isSet` / `isNotSet` with the item id as value; switch (boolean): `isOn` / `isOff`
  (no value); number: `lessThan` / `greaterThan` — value must be a STRING ("1000", not 1000).
- Page cap: **40 collection lists per page — hard server limit, measured in practice** (the old
  "~20" here was a guess and was wrong). All 40 render; the 41st is refused at write time with
  "You cannot have more than 40 Collection Lists on a single page." Sections >100 items: split into two lists filtered on a
  sort-order range (offset the second half's sort numbers by +1000 at data time).
- Text bindings inside items: set_settings key **`text`** with
  `binding: {source_type: "cms", collection_id, field_id}`. ("textContent" is the VALUE TYPE
  reported by get_bindable_sources, not the key — using it fails.) Images bind via keys `assetId`
  and `altText`, same binding shape. Discover field ids via get_collection_details; discover an
  element's bindable sources via get_bindable_sources (omit setting_key to list all).
- Visibility CANNOT be conditionally bound to CMS fields via this API (props only) — for dual-role
  rows (see patterns), use content-based styling instead.

## Styles: what bites

- Combo classes over a base MUST re-set `color` (and anything the base sets wrong for the new
  context) — e.g. a combo over a dark-page text class silently inherits its light-page color.
- A pre-existing `border-bottom` SHORTHAND beats later longhand `border-bottom-color` in compiled
  CSS — update the shorthand itself.
- No breakpoint styling via the API: a `breakpoint` param on update_style is SILENTLY IGNORED
  (lands in base). Mobile overrides go in a site-wide behavior script's injected CSS (Designer
  shows desktop anyway).
- Runtime-injected script CSS is appended after the compiled sheet, so it wins specificity TIES
  with native styles — mirror any values that exist in both places, or remove the script rule.
- `set_style` resolves names through combo chains; single-word class names that exist in multiple
  combos can resolve wrong (e.g. "label-caps" → `.btn.btn-primary.label-caps`). Prefer unique
  standalone class names; verify with `return_element_info: true`.
- clamp()/max()/gradient stacks/`scroll-margin-top` are all accepted as property values. Photo
  banners: `background-image: linear-gradient(rgba(...),rgba(...)),url('...')` on a combo class =
  client can swap the photo in the Designer.

## Hard platform limits (do not fight these)

- **Ecommerce collections (Products/SKUs) reject item creation via the CMS endpoint (403)** —
  products are Designer-Ecommerce-panel-only. Plan guided manual entry.
- **Pages cannot be deleted via the API** — there is no `delete_page` action. Designer-manual.
- **`update_page_settings` SILENTLY NO-OPS on `draft` and `seo.noindex`**:
  it returns HTTP success, but a follow-up `get_page_metadata` still shows `draft:false` and an
  empty `seo`. Never trust its response body — always re-read. So a throwaway test page can be
  neither deleted nor unpublished via the API: clean it up in the Designer.
- **Form input `placeholder` is not exposed**: not in raw/resolved settings, and set_attributes
  on it throws an internal error (reserved attribute). Designer-manual task. Other custom
  attributes (pattern, min, max, step, title) work fine via set_attributes.
- **No `date` input type** (valid: text/email/password/tel/number/url). A behavior script may
  upgrade `input.type='date'` at runtime.
- **Radio `name` publishes from the DOM id, not groupName** — shared radio groups need a runtime
  fix or identical handling in the form script.
- Nested collection lists cap at 5 items — never use them for real lists; restructure to
  top-level filtered lists.
- New collections' publish_collection_items 404s until the SITE has been published once —
  create items with isDraft:false and let the next site publish carry them live.
- HTML form validation (type/pattern) fires on SUBMIT, not per keystroke — live enforcement
  needs a small behavior script (input char-stripping, blur clamping, checkValidity styling).

## Proven patterns

- **Uniform fixed banner frames**: per-page combo over the shared hero class with
  gradient+photo stack, `height: <N>px` + `overflow: hidden` + fixed paddings (photo crops via
  cover — content can never stretch the frame). Mirror title/eyebrow/tagline metrics via shared
  combos so every page is pixel-identical; compensate overlapping sections by adding their
  overlap to height+padding-bottom so the VISIBLE frame matches. Mobile: script-injected
  `@media` override returns `height:auto` with a min-height floor so long text never clips.
- **CMS-driven catalog** (menus, service lists, price lists): one native section block per category (real h2 with a real DOM id for
  anchors + jump bar), one top-level Collection List filtered by a single-Reference "section"
  field, sorted by a per-item sort-order. Items shared across categories become per-category
  copies (editing stays per-category, which matches how clients think about printed lists). Retired items excluded by an
  `available isOn` filter, not deletion.
- **Heading rows as CMS items**: for grouped lists (group name + note between items), make the
  group heading an ordinary CMS row with an EMPTY display field; a tiny script classifies
  empty-field cards (Webflow adds `w-dyn-bind-empty`) and CSS restyles them as sub-headings.
  Clients reorder/add groups exactly like items.
- **Client-typed display prices**: a PlainText "Price Display" field holding exactly what shows
  ("$18", "From $40", "Ask us") beats number fields + pseudo-element "$" prefixes (which double up
  and fight sentinels). Check for existing `::before` "$" rules in head custom code before reuse.
- **Nav/footer components**: all links are often `href="#"` + JS-patched — set real text/hrefs
  natively via scope_component_id (DropdownLink elements reject set_link; use set_settings key
  `link` with `static_link: {mode: "url", to: "..."}`), then retire the patch scripts.

## Workflow discipline

- Verify every wave against the PUBLISHED output (curl the page + the fingerprinted
  `*.webflow.shared.*.css`), not the Designer or a browser extension (both can serve stale state).
- Keep exact deployed script sources + a published-HTML/CSS snapshot per wave in git; diff
  snapshots to catch silent regressions.
- One Data API writer at a time (agents included) — concurrent writers cause 406s/partial writes.
- Hosted-script deploys: new SemVer per change — create_asset (md5) → S3 multipart POST (expect
  201) → SRI sha384 → register_hosted_script → set_site_scripts/set_page_scripts → publish_site.
