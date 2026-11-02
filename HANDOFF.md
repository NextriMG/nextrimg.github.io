# HANDOFF — 2026-11-02

## But
Mission version anglaise (`docs/missions/version-anglaise.md`). Terminée : fusionnée dans `main` (`eea6581`) et déployée le 2026-11-02. Collègue pilote non technique : appliquer `CLAUDE.md`, section « Communication ».

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
- Vérifié : run `41455681444` sur `main` : build, deploy, audit verts ; `node scripts/audit-en.mjs` contre la production : OK.
- Non vérifié : issue des déploiements des runs `40833392817` et `40835041783`.

## État
- Historique réécrit le 2026-11-02 (`git filter-repo`) : chemins locaux, nom d'utilisateur Windows et email privé retirés de toutes les branches ; `main` = `d9c8ca0`. Vérifié : `kairn scan` sur un clone miroir neuf → 0 constat ; workflow `41482892403` vert ; `node scripts/audit-en.mjs` OK.
- Tout clone antérieur au 2026-11-02 est périmé : le supprimer et re-cloner, ne jamais le pousser.
- `feat/version-anglaise` existe encore sur GitHub (suppression interdite par la règle `protect-all-branches`), au même commit que `main`.
- Garde-fou : hook `pre-commit` de kairn (dépôt local `_Workspace`) refuse chemins absolus, nom d'utilisateur Windows, email privé, et un auteur autre que `nextri.mg@outlook.com`. Nouvelle machine : `kairn garde`. Exception légitime : `.kairn-autorise`.
- `.gitattributes` suivi : merge driver graphify de `graph.json` (`graphify hook install` le déclare sur chaque machine).

## Ensuite
1. Aucune tâche ouverte. Nouvelle tâche : nouvelle branche depuis `main` (`CLAUDE.md`, section « Git »).
