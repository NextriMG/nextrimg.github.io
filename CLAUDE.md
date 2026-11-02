# NEXTRI Portfolio · Claude Code Context

## Project

Portfolio site for NEXTRI, a 3-engineer software collective (Antananarivo, Madagascar). The UI concept is an **OS desktop experience**: macOS-inspired, not a standard marketing page.

## Communication

The person driving the session may not know this stack (React, TypeScript, Vite, Vitest, GitHub Actions). In every message to them:
- Answer in French, short sentences, one idea per sentence.
- Say what you did, what it changes, what they must do next. Nothing else.
- Name a tool or concept once with a few-word definition the first time (e.g. "Vitest, l'outil qui lance les tests"); no jargon after that without need.
- Give commands ready to copy, one per line, with what each one does.
- No long reasoning, no list of options you will not use. Ask one question at a time when a decision is theirs.

## Git

Pushing to `main` deploys to production; every push runs lint, tests and build in CI. Work on a feature branch; merge into `main` only after `npm run lint`, `npm run test:run` and `npm run build` pass locally on the branch. Never commit or push directly to `main`.

## Design Concept

### Interface Metaphor
The desktop breakpoint renders a full macOS-like shell: boot sequence, wallpaper with character illustrations, a bottom dock with sink-on-hover (scale-down), and a top menubar. Content lives inside draggable app windows. On mobile the OS metaphor is dropped entirely in favor of native mobile UX, same visual language (colors, typography, grain), different layout.

### Screens
| # | Screen | Notes |
|---|---|---|
| 00 | Boot Spectacle | Full-screen CSS/JS animation sequence before the desktop loads |
| 01 | Desktop | Dock, menubar, wallpaper with character illustrations |
| 02 | À propos | App window, accessible text content |
| 03 | L'équipe | App window, toggle between Collectif / Expert view |
| 04 | Services | Finder-style layout |
| 05 | Réalisations | Portfolio/projects |
| 06 | Contact | App window, standard accessible form |

### Color System
CSS custom properties on `[data-theme]`. The design uses a risograph aesthetic, grain texture, ink-like accent colors, paper vs. slate base.

```css
:root {
  --ff:  'DM Sans', sans-serif;         /* body */
  --ffd: 'Bricolage Grotesque', sans-serif; /* display */
  --ffm: 'JetBrains Mono', monospace;   /* code / terminal */
}

[data-theme="dark"] {
  --bg:  #1C2318;  --bg2: #252E21;  --bg3: #181e14;
  --tx:  #F4EEE0;  --tx2: #9E9880;  --tx3: #5a5448;
  --bd:  #3A4736;  --bd2: #4d5f49;
  --sh:  rgba(0,0,0,.5);
  --or:  #E8621A;  /* orange, primary accent */
  --tl:  #2BBFB3;  /* teal */
  --yw:  #F5C842;  /* yellow */
  --lv:  #9B8FD9;  /* lavender */
  --mb:  rgba(20,27,17,.9);  /* menubar */
  --dk:  rgba(20,27,17,.78); /* dock */
}
```

Light mode uses the same ink colors on a paper base (see `docs/propostion_portfolio.md` for the full palette image).

### Responsive Strategy
- **Desktop (≥1024px):** Full OS desktop metaphor
- **Mobile (<768px):** Native mobile layout, same colors and typography, no dock/windows

## Tech Stack

- **Vite 6** + **React 19** + **TypeScript** (strict mode)
- Styles: plain CSS + custom properties in `src/index.css`. Tailwind 4 is loaded (`@import "tailwindcss"`, `@tailwindcss/vite`) but project styles do not rely on utility classes; do not add new ones
- Zustand (state), Framer Motion + GSAP (animation), Driver.js (guide), Vitest + Testing Library (tests)
- No router installed yet
- i18n: no library, see « i18n » below
- GitHub Pages deploy via `.github/workflows/static.yml`

## Key Conventions

- Use CSS custom properties (`var(--bg)`, `var(--tx)`, etc.), never hardcode colors
- `[data-theme="dark" | "light"]` on the root element controls theming
- Keep boot sequence animation in plain CSS/JS, not React state
- Prefer small, focused components: one clear purpose per file
- No inline styles for layout or color; use CSS classes and custom properties

### i18n
- Two static pages, same bundle: `index.html` (`/`, French) and `en/index.html` (`/en/`, English); both listed in `build.rollupOptions.input` (`vite.config.ts`).
- UI text lives in `src/i18n/fr.ts`; `src/i18n/en.ts` is typed `Messages` (derived from `fr`). Components call `t()` (`src/i18n/index.ts`), which picks the catalog from `<html lang>`, in the component body.
- Add a string: key in `fr.ts`, same key in `en.ts` (else `tsc` fails), use `t().section.key`. Recurring terms: follow `docs/missions/glossaire-en.md`.
- Text also in the no-JS summary or meta: update `index.html` and `en/index.html` together.
- Language selector: `.mb-lang` in `Menubar.tsx`, stores `localStorage` `nxt-lang`; inline script of `index.html` redirects `/` → `/en/` when `nxt-lang = en`.
- Checks: `src/i18n/i18n.test.tsx` (no French in English, glossary, switch, HTML pages); `scripts/audit-en.mjs` (live audit, CI job `audit`).

### Window State Model

All window state lives in `useDesktopStore` (`src/store/desktop.ts`). A window has three orthogonal states tracked in two arrays:

| State | Stored in | Meaning |
|---|---|---|
| Closed | not in `openWindows` | not mounted |
| Open | in `openWindows`, not in `reducedWindows` | visible |
| Reduced | in `openWindows` AND `reducedWindows` | mounted but animated away |

Key actions: `openWindow`, `closeWindow`, `focusWindow`, `reduceWindow`, `restoreWindow`.

**Dock click logic** (macOS-style): closed → open · reduced → restore · focused → reduce · open-not-focused → focus.

**Menubar links** reflect state via CSS classes: `mb-lnk--focused` (orange underline), `mb-lnk--open` (subtle underline), `mb-lnk--reduced` (italic + dimmed). Clicking restores/focuses as appropriate.

**Dock hover**: icons scale down (`scale(0.88) translateY(3px)`), the sink effect signals the reduce-on-click behavior. Reduced icons show a dimmed dot (`var(--tx3)`) instead of the accent dot.

## Docs Reference

| File | Contents |
|---|---|
| `docs/propostion_portfolio.md` | Design proposal: palette, responsive, animation sequence, screen list |
| `docs/about-nextri/README.md` | Company profile, services, team bios, tech stack |
| `docs/about-nextri/resumes/` | Individual CVs, **not in git** (local only) |
| `docs/missions/version-anglaise.md` | Mission: English version (spec, steps 0-7) |
| `docs/missions/version-anglaise-proposition.md` | Validated serving choice (`/en/` static page) |
| `docs/missions/glossaire-en.md` | FR → EN glossary, enforced by tests |

Only `docs/propostion_portfolio.md`, `docs/assets/`, `docs/missions/` and `docs/about-nextri/README.md` are tracked; the rest of `docs/` is gitignored.

## GitHub Pages

Repo is a **user-page site** (`NextriMG.github.io`), served at the domain root, `vite.config.ts` sets `base: '/'`. All public asset paths use `import.meta.env.BASE_URL` as a prefix (injected correctly at build time). The deploy workflow (`main` → GitHub Actions → Pages) is configured in `.github/workflows/static.yml`. Live URL: `https://nextrimg.github.io/`.

## Context Strategy

### On session start
1. If `HANDOFF.md` exists → read it first (active goal, decisions, discarded noise)
2. If `graphify-out/GRAPH_REPORT.md` exists → read it before any architecture question
3. Do NOT grep raw files until graph has been consulted

### On architecture/navigation questions
- Read `graphify-out/GRAPH_REPORT.md` to identify god nodes and community structure
- Navigate to specific files via graph, not broad glob/grep sweeps

### On session end / context approaching limit
- Do NOT use /compact
- Run `/session-handoff` skill (or ask: "Write HANDOFF.md and give me the resume prompt")
- Commit HANDOFF.md to git so it survives machine switches

### Graph maintenance
- Git hooks are not cloned: on a new machine run `graphify hook install` once (check with `graphify hook status`)
- `graphify update .` rewrites `graph.json` but not `GRAPH_REPORT.md` nor `graph.html` (observed 2026-10-29); run `graphify cluster-only .` after it. Hook behavior not verified: check `GRAPH_REPORT.md` date after a commit
- Without hooks: `graphify update .` then `graphify cluster-only .`
- Tracked: `GRAPH_REPORT.md`, `graph.json`, `graph.html`; everything else in `graphify-out/` is local and gitignored