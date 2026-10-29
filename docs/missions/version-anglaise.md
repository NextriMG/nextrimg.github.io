# Mission : version anglaise du site

## Objectif
Publier une version anglaise fidèle du site, avec le même contenu, le même sens et le même ton que le français. Couvrir la chaîne complète : implémentation, tests, CI et audits après déploiement.

## Branche et mise en production
Tout pousser sur `main` déploie en production. Donc :
1. Avant toute modification : `git switch -c feat/version-anglaise` depuis `main` à jour. Tous les commits de la mission vont sur cette branche.
2. Ne jamais committer ni pousser directement sur `main`.
3. Fusionner dans `main` seulement quand, **en local, sur la branche** : `npm run lint`, `npm run test:run`, `npm run build` passent, et l'audit de l'étape 7 passe contre `npm run preview`.
4. Puis : `git switch main`, `git pull`, `git merge feat/version-anglaise`, relancer les trois commandes, `git push`. Le push déclenche le déploiement.
5. Après le push : vérifier que le workflow GitHub Actions et l'audit après déploiement passent (`gh run watch`).

## Explications au collègue
Le collègue qui pilote cette mission ne connaît pas cette stack (React, TypeScript, Vite, Vitest, GitHub Actions). Voir `CLAUDE.md`, section « Communication ».

## Règles
- Source de vérité du texte : le français **affiché par le site** (`src/`, `index.html`). `docs/about-nextri/README.md` sert de contexte seulement : il diverge du site (ex. intitulés de poste), ne pas le traduire.
- Aucune relecture humaine de la traduction n'est prévue. La garantie de fidélité repose sur le glossaire (étape 2) et les contrôles automatiques (étapes 5 et 7).
- Ne rien ajouter, retirer ou reformuler côté français. Si un texte FR paraît faux, le signaler au mainteneur sans le corriger.
- Pas de nouvelle dépendance i18n sans justification écrite dans la proposition (étape 1).
- Conventions du projet : `CLAUDE.md`. Pièges connus : `HANDOFF.md`, section « Pièges ».

## Inventaire des textes FR
- `index.html` : `lang`, `<title>`, meta description, OG/Twitter (`og:locale`), JSON-LD `description`, résumé sans JS dans `#root` (à garder aligné sur `src/components/`).
- `public/site.webmanifest` : `description`, `lang`.
- `public/sitemap.xml` : une seule `<loc>` aujourd'hui.
- `src/components/boot/`, `desktop/`, `windows/` : textes visibles, plus les attributs `aria-label`, `title`, `placeholder` (Desktop, Dock, Hero, Menubar, ContactWindow, TeamWindow, WindowShell).
- `src/hooks/useGuide.ts` : étapes et boutons Driver.js.
- `src/components/windows/ContactWindow.tsx` : messages de validation, d'erreur et de succès. `subject` (l.203) est déjà en anglais et part dans l'email interne : ne pas traduire.
- Hors périmètre : `useClock.ts` (format 24 h, sans texte), noms propres, `NEXTRI`.

## Étapes
Chaque étape se termine par son critère. Ne pas passer à la suivante avant.

0. **Prérequis.** Créer la branche (voir « Branche et mise en production »), puis `npm ci`, `npm run lint`, `npm run test:run`, `npm run build` ; `graphify hook install`. Critère : tests et build verts ; lint en échec uniquement sur les 4 erreurs listées dans `HANDOFF.md`. Les corriger en un commit séparé. Tout autre échec : le noter dans `HANDOFF.md` et prévenir le mainteneur avant de continuer.
1. **Proposition de service de l'anglais.** Écrire `docs/missions/version-anglaise-proposition.md` : URL de l'anglais (ex. `/en/` statique, bascule côté client, autre), détection et persistance du choix, sélecteur dans l'UI (desktop et mobile), indexation (`hreflang` réciproques, `x-default`, sitemap, `og:locale:alternate`), résumé sans JS anglais, contraintes GitHub Pages (statique, `base: '/'`, pas de réécriture serveur). Comparer au moins deux options, en recommander une. Critère : **validation explicite du mainteneur**. Seule étape bloquante sur un humain.
2. **Glossaire.** Écrire `docs/missions/glossaire-en.md` : une ligne par terme récurrent (Mode Collectif, Mode Expert, intitulés de poste de `TeamWindow.tsx`, noms des fenêtres et du dock, slogans), traduction retenue, termes à ne pas traduire. Registre : anglais international, professionnel, phrases courtes ; garder le tutoiement/vouvoiement neutre (« you »). Critère : chaque terme apparaît au moins deux fois dans le site ou est un nom de section.
3. **Extraction.** Sortir les textes FR des composants vers un catalogue typé : le type du catalogue anglais est dérivé du français, pour qu'une clé manquante casse `tsc`. Critère : site FR identique au pixel près (comparer des captures avant/après) et tests existants verts.
4. **Traduction et intégration.** Remplir le catalogue anglais selon le glossaire ; implémenter l'option validée à l'étape 1. Critère : build vert, parcours complet en anglais (boot, chaque fenêtre, guide, formulaire) vérifié dans un navigateur, sans texte français visible.
5. **Tests.** Ajouter à Vitest :
   - rendu de chaque fenêtre et du guide en anglais, échec si un texte contient un marqueur français (caractères `éèêàçùô`, mots « le », « les », « des », « vous », « notre ») hors noms propres en liste blanche ;
   - chaque terme du glossaire est utilisé tel quel dans le catalogue anglais ;
   - changement de langue et persistance du choix ;
   - `index.html` (et l'éventuelle page anglaise) : `lang`, meta et `hreflang` attendus.
   Critère : `npm run test:run` vert ; chaque nouveau test a été vu échouer une fois.
6. **CI.** Dans `.github/workflows/static.yml` : lancer `npm run lint` et `npm run test:run` avant `npm run build` ; déclencher le workflow sur tous les push, mais n'exécuter `deploy` que sur `main` (`if: github.ref == 'refs/heads/main'`). Critère : un push de `feat/version-anglaise` avec un test volontairement cassé fait échouer le workflow sans déployer ; annuler ce commit ensuite.
7. **Audits après déploiement.** Ajouter un job dépendant de `deploy` (ou un script `scripts/audit-en.mjs` appelé par ce job) qui interroge `https://nextrimg.github.io/` et l'URL anglaise :
   - HTTP 200 sur les deux ;
   - `<html lang>` correct sur chacune ;
   - `title`, description, OG/Twitter dans la bonne langue ;
   - `hreflang` réciproques et `x-default` ;
   - `sitemap.xml` liste les deux URL ;
   - résumé sans JS dans la bonne langue ;
   - liens internes et assets en 200.
   Critère : le job passe après déploiement de `main`, et échoue si on retire un `hreflang` (le tester en local contre `npm run preview`).

## Fin de mission
- Mettre à jour `CLAUDE.md` (convention i18n : où vivent les textes, comment ajouter une chaîne) et `README.md` (commandes, URL anglaise).
- Réécrire `HANDOFF.md`.
