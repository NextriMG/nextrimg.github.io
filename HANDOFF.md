# HANDOFF — 2026-05-27

## Active goal
All three requested features fully implemented and tested; session closing cleanly.

## State
All features complete on `main` @ `a712b3b`. 23 tests pass. Working tree clean (stray `ss-03-error.png` screenshot is noise — can be deleted).

## Decisions made
- **Window reduce state**: added `reducedWindows: WindowId[]` alongside `openWindows` in Zustand store — windows stay mounted and animate to `{scale:0.5, opacity:0, y:60}` rather than unmounting, enabling restore-from-dock
- **Feature flag pattern**: `VITE_CONTACT_ENABLED` read inside component function body (not module-level const) so `vi.stubEnv` works in Vitest
- **Turnstile + Web3Forms**: invisible Turnstile widget polled until `window.turnstile` ready; form also works without token (when `VITE_TURNSTILE_KEY` is empty), which is how E2E tests run
- **Anti-abuse stack**: 3-second mount guard (silent, no error message) + in-flight lock + 60-second localStorage cooldown (`nxt-c-cd`)
- **Menubar dot design**: glassy blurry box for focused, ice blue dot for open/not-focused, yellow+italic for reduced, nothing for closed — stable layout via always-present `border: 1px solid transparent` + padding on base `.mb-lnk`
- **ServicesWindow colors**: `data-c` attribute (tl/or/lv/yw) per card, matching TeamWindow pattern
- **Focus transfer**: `closeWindow` now picks the highest-z non-reduced sibling to become `focusedWindow`
- **Dock hover**: sink effect (`scale(0.88) translateY(3px)`) — was magnify

## Files touched
- `src/store/desktop.ts` — `reducedWindows`, `reduceWindow`, `restoreWindow`, focus-transfer in `closeWindow`
- `src/store/desktop.test.ts` — two focus-transfer tests
- `src/components/desktop/Dock.tsx` — smart click handler (open/reduce/restore/focus), `reduced` CSS class
- `src/components/desktop/Menubar.tsx` — `getLinkClass`, `handleLinkClick`, dynamic dot states
- `src/components/windows/WindowShell.tsx` — Framer Motion animate prop, yellow button → reduceWindow
- `src/components/windows/ServicesWindow.tsx` — `data-c` per card
- `src/components/windows/ContactWindow.tsx` — full rewrite: `ContactFallback` + `ContactForm` + `SuccessScreen`
- `src/components/windows/ContactWindow.test.tsx` — `vi.stubEnv` to force fallback mode
- `src/vite-env.d.ts` — Turnstile global type declarations
- `src/index.css` — dock sink, menubar dot styles, contact form styles, service card hover colors
- `index.html` — Turnstile script tag
- `.github/workflows/static.yml` — `env:` block on build step for three secrets
- `.env` — placeholder file (gitignored) — DO NOT COMMIT
- `CLAUDE.md` — updated: dock description, workflow filename, base URL, Window State Model section
- `README.md` — full rewrite

## Open questions
- Verify email arrived at `alt.r2-9ozn26ju@yopmail.com` on yopmail.com (E2E test dispatched a submission)
- GitHub Secrets (`VITE_CONTACT_ENABLED`, `VITE_WEB3FORMS_KEY`, `VITE_TURNSTILE_KEY`) — user said already set; confirm before next deploy

## Next actions (ordered)
1. Delete stray `ss-03-error.png` from project root
2. Continue building remaining screens: Réalisations (screen 05) or L'équipe Expert view toggle
3. Consider adding a guide/onboarding tour dismissal mechanism (guide popup appeared during E2E test)

## Suggested skills / patterns for next session
- `/run` skill if testing UI changes interactively
- TDD skill if adding new components with tests
- Zustand store pattern already established — follow same actions/selectors structure

## Discarded as noise ⚠️
- **Playwright Turnstile timeout**: Turnstile's invisible widget never fires in Playwright/Chromium (bot fingerprint); workaround is to set `VITE_TURNSTILE_KEY=""` in dev server env for E2E runs — do not attempt to work around Turnstile by mocking `window.turnstile`
- **Module-level const for feature flag**: `const CONTACT_ENABLED = import.meta.env.VITE_CONTACT_ENABLED === 'true'` evaluated at import time — breaks `vi.stubEnv`; always read `import.meta.env.*` inside the component body
- **`/tmp/pw-runner` on Windows**: path resolves wrong; use `<temp>/pw-runner/` — but Playwright is not a project dependency, temp install only
- **3-second guard as silent block**: during initial E2E test the form submitted too fast and nothing happened; fixed by adding a 3500ms wait — not a bug, working as intended

## Git state
a712b3b feat: fully working contact form with Web3Forms + Turnstile
cc3abfa fix: transfer focus to next window when focused window is closed
fac2a47 feat: rework menubar state dots + colorise service cards
3346572 Update .gitignore
45271ea feat: replace menubar underlines with animated status dots
ee6d72c docs: update CLAUDE.md and README to reflect current project state
4277e1e feat: window minimize, dock sink-on-hover, menubar state indicators
48ddfa3 Configure GitHub Pages base and asset paths

(working tree clean — stray ss-03-error.png untracked)
