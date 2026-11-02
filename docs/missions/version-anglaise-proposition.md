# Proposition : servir la version anglaise

Statut : **option A validée par le mainteneur le 2026-11-02** (étape 1 de `docs/missions/version-anglaise.md`).

## Contraintes GitHub Pages
- Hébergement statique : un fichier par URL, aucune réécriture serveur, aucun en-tête HTTP personnalisé.
- `base: '/'` (site utilisateur, racine du domaine).
- Robots et aperçus de lien lisent le HTML sans exécuter le JS : `lang`, meta, OG et résumé sans JS doivent déjà être en anglais dans le fichier servi.
- `hreflang` exige une URL distincte par langue.

## Option A, recommandée : page statique `/en/`
- Second point d'entrée Vite : `en/index.html`, copie anglaise de `index.html` (`lang="en"`, title, description, OG/Twitter, `og:locale` `en_US`, JSON-LD, résumé sans JS). Déclaré dans `build.rollupOptions.input` de `vite.config.ts`. Produit `dist/en/index.html`, servi à `https://nextrimg.github.io/en/`.
- Même bundle JS pour les deux pages. Langue de l'app = `document.documentElement.lang`, lu au démarrage.
- Textes : deux objets TypeScript (`fr`, `en`), type de `en` dérivé de `fr`. Aucune dépendance i18n : 2 langues, pas de pluriels ni de formats complexes, un objet typé suffit.
- Sélecteur : bouton `FR / EN` dans `.mb-r` du menubar, à côté du thème. Visible en desktop et en mobile (le menubar reste affiché sous 1024 px, seuls les liens `.mb-lnk` sont masqués). C'est un vrai lien `<a href="/en/">` / `<a href="/">` : rechargement de page, accessible, crawlable.
- Persistance : l'URL porte la langue (partageable, favoris). Le clic sur le sélecteur enregistre aussi `localStorage` `nxt-lang`.
- Détection : pas de redirection automatique sur la langue du navigateur (Google la déconseille ; Googlebot est en `en-US` et ne verrait plus la page FR). Seule redirection : `/` → `/en/` si `nxt-lang = en` est déjà stocké (choix explicite, jamais présent chez un robot). Le boot n'est pas rejoué (déjà sauté après la première visite).
- Indexation, sur les deux pages : `<link rel="alternate" hreflang="fr" href="https://nextrimg.github.io/">`, `hreflang="en"` → `/en/`, `hreflang="x-default"` → `/` ; `canonical` propre à chaque page ; `og:locale` + `og:locale:alternate` croisés. `sitemap.xml` : deux `<url>` avec leurs `xhtml:link` alternates.
- À corriger dans `index.html` pour que la copie fonctionne sous `/en/` : les chemins relatifs `./favicon.ico`, `./site.webmanifest`, `./src/main.tsx` deviennent absolus (`/…`).
- CSP : le plugin `csp()` de `vite.config.ts` traite chaque page HTML séparément, le JSON-LD anglais aura donc son propre hachage. À vérifier au build.
- Manifest : on garde le manifest FR unique (une PWA n'a qu'un `start_url`). Coût : l'app installée démarre en FR.
- Coût : deux `index.html` à garder alignés. Couvert par les tests de l'étape 5 et l'audit de l'étape 7.

## Option B, écartée : bascule côté client sur une seule URL
- Bouton qui change la langue en mémoire (`?lang=en` ou `localStorage`), une seule page HTML.
- Plus simple à coder, mais : pas d'URL anglaise distincte, donc ni `hreflang` ni sitemap anglais ; meta, OG et résumé sans JS restent en français pour robots et aperçus de lien. Échoue sur les critères de l'étape 7.

## Option C, écartée : pré-rendu complet (SSG, ex. `vite-ssg`)
- Rendrait tout le contenu des fenêtres en HTML statique par langue.
- Nouvelle dépendance et refonte du démarrage (boot en CSS/JS, fenêtres en état Zustand) pour un gain marginal : le résumé sans JS couvre déjà le référencement.

## Décision attendue
Valider l'option A telle quelle, ou indiquer les changements.
