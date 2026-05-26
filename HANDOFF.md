# HANDOFF — 2026-05-26 19:45

## Active goal
GitHub Pages deployment wired up end-to-end: workflow renamed, Vite base configured, and all public asset paths fixed.

## State
Working tree is clean. `main` and `v2.0` are both at `938413c`. The static.yml workflow triggers on push to `main` — the force-push earlier in this session may have already queued a run. GitHub Pages source must be set to **GitHub Actions** in repo settings for the deploy to land.

## Decisions made
- **`base: '/nextri_portfolio/'`** in `vite.config.ts` — required for project-repo GitHub Pages; `'./'` (relative) was the previous value and causes broken asset paths under a subpath
- **`import.meta.env.BASE_URL` prefix for all public assets** — `BootStrip.tsx` and the three avatar components used hardcoded `/` absolute paths which resolve to the domain root, not the subpath; `BASE_URL` is injected correctly at build time
- **`homepage` field in `package.json`** — documents the live URL; not functionally required by Vite but useful convention
- **Hard-reset `main` to `v2.0` + force-push** — branches had diverged (main had `26a556a Create .graphifyignore`); `.graphifyignore` content was already present in `v2.0` so no file content was lost

## Files touched
- `.github/workflows/static.yml` — renamed from `deploy.yml` (content unchanged — already correct)
- `vite.config.ts` — `base: './'` → `base: '/nextri_portfolio/'`
- `package.json` — added `"homepage": "https://nextrimng.github.io/nextri_portfolio"`
- `src/components/boot/BootStrip.tsx` — all 12 `src` paths prefixed with `${import.meta.env.BASE_URL}`
- `src/components/avatars/ItoAvatar.tsx` — `/avatars/itokiana.png` → `${import.meta.env.BASE_URL}avatars/itokiana.png`
- `src/components/avatars/LionelAvatar.tsx` — same fix for lionel.png
- `src/components/avatars/SitrakaAvatar.tsx` — same fix for sitraka.png

## Open questions
- **GitHub Pages source** — must be set to "GitHub Actions" in repo Settings → Pages; if still on "Deploy from branch" the workflow will silently fail
- **Force-push workflow trigger** — GitHub Actions does fire on force-push to main; check the Actions tab to confirm the run started and passed
- **`npm run dev` asset paths** — `BASE_URL` is `/` in dev mode, so local dev still works correctly; worth a quick sanity check after any further public-folder changes

## Next actions
1. In GitHub repo Settings → Pages → Source: set to **GitHub Actions** (if not already)
2. Check Actions tab — confirm the `static.yml` workflow run triggered and passed
3. Visit `https://nextrimng.github.io/nextri_portfolio/` and verify the boot animation, SVG logos, and avatar images all load
4. If the force-push didn't trigger a run: make a trivial commit on `main` or trigger via `workflow_dispatch` in the Actions UI

## Suggested skills / patterns
- `/verify` — real-browser check of the live Pages URL once deployed
- `superpowers:systematic-debugging` — if assets 404 on Pages, check Network tab for the resolved URLs vs expected `/nextri_portfolio/...` paths

## Discarded as noise
- **`base: './'` (relative paths)** — works for local `vite preview` but breaks on GitHub Pages subpaths because relative resolution from `index.html` doesn't propagate into JS-generated `<img src>` values
- **`homepage` field driving Vite behavior** — that's a Create React App convention; in Vite only `vite.config.ts base` matters

## Git state
938413c Prefix asset paths with BASE_URL
8d2d29a Configure homepage and Vite base for GitHub Pages
4de0183 chore: rename deploy.yml to static.yml
5904845 Migrate static site to Vite + React + TS
1345864 Update .gitignore

 (working tree clean)
