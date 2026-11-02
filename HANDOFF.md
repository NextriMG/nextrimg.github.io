# HANDOFF — 2026-11-02

## But
Aucune tâche en cours. Version anglaise livrée (spec : `docs/missions/version-anglaise.md`) ; historique public nettoyé des traces personnelles. Collègue pilote non technique : appliquer `CLAUDE.md`, section « Communication ».

## Décidé (ne pas rediscuter)
- Anglais servi en page statique `/en/`, sans redirection sur la langue du navigateur ; choix mémorisé dans `localStorage` `nxt-lang` (`docs/missions/version-anglaise-proposition.md`).
- Glossaire imposé par les tests : `docs/missions/glossaire-en.md`.
- Manifest PWA unique, FR.
- Aucun chemin local, nom d'utilisateur Windows ni email privé dans un fichier suivi ou un message de commit (hook kairn, voir « Où c'est »).
- Auteur des commits de ce dépôt : `nextri.mg@outlook.com`.
- Navigateur toujours invisible (headless), jamais les outils MCP `browser_*` (mémoire `playwright-headless`).

## Écarté
- Mode kairn « valeurs dans `.kairn/` ignoré » : aucun dépôt n'en a besoin (portfolio perso privé, valeurs en clair, choix de l'utilisateur).
- Suppression de `feat/version-anglaise` sur GitHub : interdite par la règle `protect-all-branches` ; la branche reste, au même commit que `d9c8ca0`.

## Où c'est
- i18n : `CLAUDE.md`, section « i18n ».
- CI : `.github/workflows/static.yml` (lint, tests, build sur chaque push ; `deploy` si `main` ; `audit` après `deploy`).
- Audit en ligne : `scripts/audit-en.mjs` (`npm run audit:en -- <base>`).
- Garde-fou : hooks `.git/hooks/pre-commit`, `commit-msg`, `pre-push` posés par `kairn garde` (outil dans le dépôt local `_Workspace`, voir son `CLAUDE.md`) ; audit d'historique : `kairn scan .` ; exception : `.kairn-autorise` à la racine.

## Pièges
- Lire `import.meta.env.*` et `t()` dans le corps du composant, jamais en constante de module (tests).
- Turnstile ne se déclenche jamais sous Playwright : serveur E2E avec `VITE_TURNSTILE_KEY=""`.
- Formulaire : envoi ignoré moins de 3 s après ouverture, puis 60 s d'attente (`localStorage` `nxt-c-cd`).
- Boot sauté en mouvement réduit et après la première visite de la session (`sessionStorage` `booted`).
- Fichiers en CRLF sur disque : script Python avec `newline=''` ; Git Bash perd les antislashs dans un heredoc : écrire avec Write/Edit.
- `tsconfig.app.json` cible ES2020 : pas de `replaceAll`.
- Le hook graphify régénère `graphify-out/` en arrière-plan après commit et changement de branche : attendre la fin (`~/.cache/graphify-rebuild.log`, ligne « updated in ») puis `git checkout -- graphify-out` avant un merge, ou committer la carte à part.
- Pousser en force : compte `gh` `NextriMG` (`gh auth switch -u NextriMG`) et désactiver puis réactiver les rulesets `19599203` et `19599227`. Compte actif par défaut : `SitrakaRasata`.

## Vérifié / non vérifié
- Vérifié 2026-11-02 sur `c763c94` : `npm run lint` 0 erreur ; `npm run test:run` 42/42 ; `npm run build` vert ; `node scripts/audit-en.mjs` OK ; `kairn scan .` 0 constat ; dernier workflow `main` vert (build, deploy, audit).
- Vérifié : clone miroir neuf de GitHub, `kairn scan` 0 constat ; hooks refusent chemin en contenu et en message, `--author` privé, commit `--no-verify` au push.
- Non vérifié : issue des déploiements des runs `40833392817` et `40835041783` (antérieurs).

## État
- Branche `main` = `origin/main` = `c763c94`. Non commité : cette réécriture de `HANDOFF.md`.
- Historique réécrit le 2026-11-02 ; Lionel et Itokiana prévenus de re-cloner. Aucun processus lancé.

## Ensuite
1. Committer cette passation (branche locale, fusion, push ; le hook kairn la contrôle).
2. Optionnel : demander au support GitHub la purge des anciens commits encore accessibles par SHA.
3. Optionnel, autre dépôt : `sitrakarasata.github.io` a 17 lignes suivies avec des chemins (`PRODUCT.md`, `docs/audit-contenu.md`, `outils/*.mjs`) ; nettoyer ou `.kairn-autorise`.
