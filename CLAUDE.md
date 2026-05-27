# NEXTRI Portfolio — Claude Code Context

## Project

Portfolio site for NEXTRI, a 3-engineer software collective (Antananarivo, Madagascar). The UI concept is an **OS desktop experience** — macOS-inspired, not a standard marketing page.

## Design Concept

### Interface Metaphor
The desktop breakpoint renders a full macOS-like shell: boot sequence, wallpaper with character illustrations, a bottom dock with sink-on-hover (scale-down), and a top menubar. Content lives inside draggable app windows. On mobile the OS metaphor is dropped entirely in favor of native mobile UX — same visual language (colors, typography, grain), different layout.

### Screens
| # | Screen | Notes |
|---|---|---|
| 00 | Boot Spectacle | Full-screen CSS/JS animation sequence before the desktop loads |
| 01 | Desktop | Dock, menubar, wallpaper with character illustrations |
| 02 | À propos | App window — accessible text content |
| 03 | L'équipe | App window — toggle between Collectif / Expert view |
| 04 | Services | Finder-style layout |
| 05 | Réalisations | Portfolio/projects |
| 06 | Contact | App window — standard accessible form |

### Color System
CSS custom properties on `[data-theme]`. The design uses a risograph aesthetic — grain texture, ink-like accent colors, paper vs. slate base.

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
  --or:  #E8621A;  /* orange — primary accent */
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
- **Mobile (<768px):** Native mobile layout — same colors and typography, no dock/windows

## Tech Stack

- **Vite 6** + **React 19** + **TypeScript** (strict mode)
- No CSS framework — custom properties + plain CSS
- No router installed yet
- GitHub Pages deploy via `.github/workflows/static.yml`

## Key Conventions

- Use CSS custom properties (`var(--bg)`, `var(--tx)`, etc.) — never hardcode colors
- `[data-theme="dark" | "light"]` on the root element controls theming
- Keep boot sequence animation in plain CSS/JS, not React state
- Prefer small, focused components — one clear purpose per file
- No inline styles for layout or color; use CSS classes and custom properties

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

**Dock hover**: icons scale down (`scale(0.88) translateY(3px)`) — the sink effect signals the reduce-on-click behavior. Reduced icons show a dimmed dot (`var(--tx3)`) instead of the accent dot.

## Docs Reference

| File | Contents |
|---|---|
| `docs/propostion_portfolio.md` | Design proposal: palette, responsive, animation sequence, screen list |
| `docs/about-nextri/README.md` | Company profile, services, team bios, tech stack |
| `docs/about-nextri/resumes/` | Individual CVs for Lionel, Itokiana, Sitraka |

## GitHub Pages

`vite.config.ts` sets `base: '/nextri_portfolio/'`. All public asset paths use `import.meta.env.BASE_URL` as a prefix (injected correctly at build time). The deploy workflow (`main` → GitHub Actions → Pages) is configured in `.github/workflows/static.yml`. Live URL: `https://nextrimng.github.io/nextri_portfolio/`.

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
- Graph auto-updates via git hooks (post-commit, post-checkout)
- If hooks not installed: run `graphify . --update` after major refactors