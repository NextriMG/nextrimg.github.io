# NEXTRI — Portfolio

Portfolio site for NEXTRI, a software collective of three engineers based in Antananarivo, Madagascar. The interface is designed as an OS desktop experience (macOS-inspired) with a boot sequence, dock, app windows, and full dark/light mode support.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Deployment | GitHub Pages (GitHub Actions) |

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

Deployment is automated via `.github/workflows/deploy.yml`. Every push to `main` builds and deploys to GitHub Pages.

**Before first deploy:**
1. Create the GitHub repo and push
2. In repo Settings → Pages → set Source to **GitHub Actions**
3. If deploying to a project repo (not a root `username.github.io` site), update `base` in `vite.config.ts` from `'./'` to `'/<repo-name>/'`

## Project Structure

```
├── src/
│   ├── main.tsx        # entry point
│   ├── App.tsx         # root component
│   └── index.css       # global styles
├── docs/
│   ├── propostion_portfolio.md   # design proposal (screens, palette, responsive)
│   └── about-nextri/
│       ├── README.md             # company profile & team
│       └── resumes/              # individual CVs
├── .github/workflows/
│   └── deploy.yml      # GitHub Pages deployment
└── vite.config.ts
```

## Design Reference

See [`docs/propostion_portfolio.md`](docs/propostion_portfolio.md) for the full design spec: color palette (dark/light), responsive strategy, animation sequence, and screen-by-screen breakdown.

## Team

| Name | Role |
|---|---|
| Lionel Ratovo | Technical Project Lead · Backend & Data Engineer |
| Itokiana Rajohnson | Full Stack Developer · Assistant Project Manager |
| Sitraka Rasatarivony | Full Stack Developer · DevOps / DevSecOps |
