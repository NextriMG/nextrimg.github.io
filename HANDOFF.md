# HANDOFF · 2026-10-29

## Objectif actif
Mission : version anglaise du site. Lire `docs/missions/version-anglaise.md` et commencer à l'étape 0.

## État de `main`
- `npm run test:run` : 23 tests, 4 fichiers, verts (lancé le 2026-10-29).
- `npm run build` : vert (lancé le 2026-10-29).
- `npm run lint` : **4 erreurs préexistantes** `@typescript-eslint/no-unused-vars` : `_props` dans `src/components/avatars/{Ito,Lionel,Sitraka}Avatar.tsx:3`, `_token` dans `src/components/windows/ContactWindow.tsx:139`. À corriger avant l'étape 6 (lint en CI), sinon la CI casse.
- La CI (`.github/workflows/static.yml`) ne lance que `npm ci` + `npm run build`.
- `graphify-out/GRAPH_REPORT.md` régénéré le 2026-10-29 sur le commit `a0dcbe5` (101 nœuds, 218 liens).

## Décisions prises
- Agent cible : Claude Code ; `CLAUDE.md` reste la source des conventions.
- Fidélité de l'anglais : garantie par glossaire + contrôles automatiques, sans relecture humaine.
- Mode de service de l'anglais (URL, bascule, indexation) : **non décidé** ; l'agent propose, le mainteneur valide (étape 1 de la mission).
- `docs/` : seuls `propostion_portfolio.md`, `assets/`, `missions/`, `about-nextri/README.md` sont suivis. CV et captures restent locaux.

## Pièges
- Lire `import.meta.env.*` dans le corps du composant, jamais en constante de module : sinon `vi.stubEnv` n'a pas d'effet (cf. `VITE_CONTACT_ENABLED` dans `ContactWindow.tsx`).
- Turnstile ne se déclenche jamais sous Playwright/Chromium : pour un test E2E du formulaire, lancer le serveur avec `VITE_TURNSTILE_KEY=""`. Ne pas simuler `window.turnstile`.
- Le formulaire ignore silencieusement un envoi moins de 3 s après l'ouverture, puis impose 60 s d'attente (`localStorage` `nxt-c-cd`) : attendre 3,5 s dans les tests E2E.
- Le boot est sauté en mouvement réduit et après la première visite (`src/store/desktop.ts`) : vider `localStorage` pour le revoir.
- Playwright n'est pas une dépendance du projet.
- Le résumé sans JS de `index.html` duplique les textes des fenêtres : toute modification de texte doit s'y répercuter.

## Prochaines actions
1. Étape 0 de `docs/missions/version-anglaise.md`, y compris `graphify hook install`.
2. Étape 1 : proposition, puis attendre la validation du mainteneur.
