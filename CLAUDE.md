# Viipiin.github.io — Claude Code Project Instructions

Static GitHub Pages vault/portfolio site. No build step. No framework. Pure HTML/CSS/JS.
Live: https://viipiin.github.io

---

## Critical head-tag order — EVERY new page in pages/

```html
<head>
  <script src="../js/vault.js"></script>              <!-- 1st: vault bypass — MUST be synchronous, no defer/async -->
  <link rel="stylesheet" href="../css/base.css">      <!-- 2nd: shared reset -->
  <link rel="stylesheet" href="../css/page-shell.css"> <!-- 3rd: responsive width contract, see below -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>...</title>
  <!-- favicon, Google Fonts, then page <style> -->
</head>
```

`js/vault.js` — checks localStorage token (`key: dmtwdjIwMjU=`), redirects to `location.origin+'/'` if invalid.
`css/base.css` — 7-line reset (box-sizing, scroll, Segoe UI, code font, print). Page `<style>` always overrides it.
`css/page-shell.css` — responsive width contract, see below. Page `<style>` always overrides it.

---

## Responsive width contract — required for every new page in pages/

An audit found every page except `index.html` had one of two recurring large-screen bugs:
1. **Unbounded content width** — a content column with no `max-width` stretches edge-to-edge on
   big monitors (unreadably long lines). Caused by `main{flex:1; padding:...}` with nothing capping width.
2. **Capped but not centered** — a fixed sidebar + content area with a `max-width` but no
   auto-centering hugs the left edge and leaves a dead gap on the right on wide screens. Caused by
   `#main{margin-left:var(--sw); max-width:1000px}` with no `margin:0 auto` (which doesn't work here
   anyway, since `margin-left` is already pinned to the sidebar offset, not `auto`).

`css/page-shell.css` (linked per the head-tag order above) fixes both via two ready-made classes —
use them on every new page instead of inventing layout CSS from scratch:

- **No sidebar** (plain article/guide): `<main class="vk-shell-main">...</main>`
- **Fixed/sticky sidebar + content**: `<body style="display:flex">`, sidebar nav, then
  `<main class="vk-shell-content"><section>...</section>...</main>` — each direct child of
  `.vk-shell-content` is automatically width-capped and centered in the remaining space, set `--sw`
  to your sidebar's width.

If a page needs bespoke CSS instead of these classes, the rule to preserve is: **every readable
content block must have both `max-width` (1000–1200px) and centering (`margin:0 auto`, or
`flex` auto-margins/`align-items:center` when next to a fixed sidebar)** — never one without the other.

---

## Pages that do NOT use vault (public — no vault.js or base.css needed)
`blog.html`, `contact.html`, `resources.html` — use `assets/css/` architecture instead.

---

## File conventions
- All page files: `lowercase-kebab-case.html` in `pages/`
- Prompt templates: `.claude/*.prompts.md` — reference with `@.claude/filename.prompts.md`
- Slash commands: `.claude/commands/*.md` — invoke with `/command-name`

---

## Vault entry format (when adding a page to index.html)
```html
<a href="pages/page-name.html" class="vk-a vk-blue" target="_blank" rel="noopener noreferrer">
  <div class="vk-ico">🎯</div>
  <div class="vk-txt">
    <span class="vk-t">Page Title</span>
    <span class="vk-d">Short description · key topics</span>
  </div>
  <span class="vk-arr">→</span>
</a>
```
Card colour classes: `vk-blue` `vk-purple` `vk-green` `vk-orange` `vk-teal`

---

## Generating large HTML pages — token-efficient approach
1. Write skeleton file first (PowerShell `Set-Content`) — full `<head>`, nav, section placeholders
2. Read skeleton once, then use sequential `Edit` calls — one section per call
3. Never batch more than 3 sections per Edit (avoids loop-warning threshold)
4. Commit only after all sections are complete

---

## Git workflow
Direct to `main` — no PRs. Use: `/commit-push` slash command, or:
```
git add <specific-files> && git commit -m "message" && git push origin main
```
Never `git add -A` — may catch `.env` or large binaries accidentally.

---

## Prompt templates available
| File | Use for |
|------|---------|
| `PPALMExpert.prompts.md` | Power Platform ALM guide |
| `FullStackandAIDeveloper.prompts.md` | Azure .NET + AI interview guide |
| `DLPPoliciesGuide.prompts.md` | DLP policies deep-dive |
| `SaveYourClient.prompts.md` | Client cost optimisation playbook |
| `AIArchitectPath.prompts.md` | AI Architect 30-day roadmap |
| `JobRole.prompts.md` | Job role / persona guides |
