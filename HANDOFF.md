# HANDOFF — 2026-11-02

## But
Mission version anglaise (`docs/missions/version-anglaise.md`). Étapes 0 à 7 faites sur `feat/version-anglaise`. Reste : fusion dans `main`, push (= déploiement), vérifier le workflow et le job `audit`. Collègue pilote non technique : appliquer `CLAUDE.md`, section « Communication ».

## Décidé (ne pas rediscuter)
- Option A validée le 2026-11-02 : page statique `/en/`, pas de redirection sur la langue du navigateur, choix mémorisé dans `localStorage` `nxt-lang` (`docs/missions/version-anglaise-proposition.md`).
- Glossaire : `docs/missions/glossaire-en.md`, imposé par `src/i18n/i18n.test.tsx`. Cinq intitulés de poste n'apparaissent qu'une fois sur le site : gardés car la spec les exige.
- Manifest PWA unique, FR.
- Playwright toujours invisible : `node .playwright-mcp/run.mjs <script.js>`, jamais les outils MCP `browser_*` (demande répétée du collègue).

## Où c'est
- i18n : `CLAUDE.md`, section « i18n ».
- CI : `.github/workflows/static.yml` (lint, tests, build sur chaque push ; `deploy` si `main` ; `audit` après `deploy`).
- Audit : `scripts/audit-en.mjs`, `npm run audit:en -- <base>`.

## Pièges
- Lire `import.meta.env.*` et `t()` dans le corps du composant, jamais en constante de module (tests).
- Turnstile ne se déclenche jamais sous Playwright : serveur E2E avec `VITE_TURNSTILE_KEY=""`.
- Formulaire : envoi ignoré moins de 3 s après ouverture, puis 60 s d'attente (`localStorage` `nxt-c-cd`).
- Boot sauté en mouvement réduit et après la première visite de la session (`sessionStorage` `booted`).
- Fichiers en CRLF sur disque : un script Python doit lire/écrire avec `newline=''`.
- `tsconfig.app.json` cible ES2020 : pas de `replaceAll`.
- Le hook graphify régénère `graphify-out/` (dont `GRAPH_REPORT.md`) en arrière-plan après chaque commit : le committer à part.
- Captures pixel : bruit de rendu ≤ 2/255 entre deux prises identiques ; comparer avec un seuil (`.playwright-mcp/diff.js`, seuil 24).

## Vérifié / non vérifié
- Vérifié 2026-11-02 sur la branche, commandes lancées : `npm run lint` 0 erreur ; `npm run test:run` 42/42 ; `npm run build` vert ; `node scripts/audit-en.mjs http://localhost:4173/` OK, et en échec si un `hreflang` est retiré de `dist/en/index.html`.
- Vérifié : FR identique au pixel près après extraction (26 captures desktop + mobile, `.playwright-mcp/shots/before` vs `after`), seule différence ensuite : le bouton `EN`.
- Vérifié : parcours anglais complet sans français ni erreur console (`.playwright-mcp/check-en.js`).
- Vérifié sur GitHub : run `41453436803` (test cassé) échoue, `deploy` sauté ; run `41453616277` vert, `deploy` sauté.
- Non vérifié : job `audit` en production (n'existe qu'après la fusion).
- Non vérifié : issue des déploiements des runs `40833392817` et `40835041783`.

## État
- Branche `feat/version-anglaise`, poussée jusqu'à `209f140` ; commits locaux en plus : audit, docs.
- Non commité : `scripts/icons.mjs` (modif de l'utilisateur, ne pas toucher) ; `.gitattributes` créé par `graphify hook install` (merge driver de `graph.json`), décision de le committer en attente.
- Serveur `vite preview` lancé en arrière-plan sur le port 4173.

## Ensuite
1. Accord du collègue pour la mise en production.
2. Spec, « Branche et mise en production », points 4 et 5 : `git switch main`, `git pull`, `git merge feat/version-anglaise`, lint/tests/build, `git push`, `gh run watch`.
3. Vérifier le job `audit` vert, puis mettre à jour ce fichier.
