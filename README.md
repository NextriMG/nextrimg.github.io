# NEXTRI — Portfolio

Portfolio site for NEXTRI, a software collective of three engineers based in Antananarivo, Madagascar. The interface is an **OS desktop experience** (macOS-inspired): boot sequence, draggable app windows, a dock, and a menubar. On mobile the OS metaphor gives way to a native mobile layout — same visual language, different structure.

**Live:** https://nextrimng.github.io/nextri_portfolio/

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 6 |
| State | Zustand 5 |
| Animation | Framer Motion 12 + GSAP 3 |
| Styling | Plain CSS + custom properties (no framework) |
| Theme | next-themes — `[data-theme="dark|light"]` on root |
| Icons | Lucide React |
| Tour | Driver.js |
| Tests | Vitest + Testing Library |
| Deploy | GitHub Actions → GitHub Pages |

## Getting Started

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # tsc + vite build → dist/
npm run preview   # preview the production build locally
npm test          # vitest watch mode
npm run test:run  # single test run
```

## Deploy

Push to `main` — `.github/workflows/static.yml` builds and deploys to GitHub Pages automatically.

**First-time setup:**
1. In repo Settings → Pages → Source: set to **GitHub Actions**
2. `vite.config.ts` already has `base: '/nextri_portfolio/'` — update if the repo is renamed

Asset paths use `import.meta.env.BASE_URL` (resolves to `/nextri_portfolio/` in production, `/` in dev).

## Project Structure

```
src/
  components/
    boot/         # Boot animation (BootScreen, BootProgress, BootStrip)
    desktop/      # Desktop shell (Desktop, Menubar, Dock, Hero, Wallpaper)
    windows/      # App windows (AboutWindow, TeamWindow, ServicesWindow, ContactWindow)
    avatars/      # SVG avatar components (Lionel, Itokiana, Sitraka)
  store/
    desktop.ts    # Zustand store — all window + phase state
  hooks/
    useClock.ts   # Live clock for menubar
    useGuide.ts   # Driver.js onboarding tour
  types/
    index.ts      # WindowId, Phase, TeamMode
  index.css       # All styles — custom properties, OS shell, windows, dock
  App.tsx         # Root — theme provider + phase routing (boot → desktop)
docs/
  propostion_portfolio.md   # Design proposal: palette, screens, animations
  about-nextri/             # Company profile, team bios, CVs
```

## Window State Model

Windows have three states tracked in the Zustand store:

| State | In `openWindows` | In `reducedWindows` |
|---|---|---|
| Closed | no | no |
| Open | yes | no |
| Reduced (minimised) | yes | yes |

**Dock click:** closed → open · reduced → restore · focused → reduce · open-not-focused → focus.
The yellow title-bar button reduces; the red button closes entirely.
Menubar links reflect state: orange underline = focused, grey underline = open, italic+dim = reduced.

## Design Reference

See [`docs/propostion_portfolio.md`](docs/propostion_portfolio.md) for the full design spec: color palette (dark/light), responsive strategy, animation sequence, and screen-by-screen breakdown.

## Team

| Name | Role |
|---|---|
| Lionel Ratovo | Technical Project Lead · Backend & Data Engineer |
| Itokiana Rajohnson | Full Stack Developer · Assistant Project Manager |
| Sitraka Rasatarivony | Full Stack Developer · Backend, CI/CD |
