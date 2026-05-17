# Nextri

Portfolio interactif de l'équipe **Nextri** — trois ingénieurs fullstack diplômés du Master II MBDS à ITUniversity Madagascar / Université Côte d'Azur. L'interface simule un environnement de bureau OS avec boot log, lock screen, fenêtres déplaçables et terminal émulateur — en HTML/CSS/JS vanilla.

## Aperçu

Au chargement, une séquence de boot terminal défile, suivie d'un lock screen (horloge, date, branding équipe). Un clic ou la touche `Entrée` accède au bureau.

**Applications incluses :**

| App | Contenu |
|-----|---------|
| Terminal | Shell simulé — `help`, `neofetch`, `whoami`, `cat about.txt`, `cat stack.txt`, `open [app]`… |
| Équipe | Liste des 3 membres — clic pour ouvrir une fenêtre de profil complet |
| Lionel / Itokiana / Sitraka | Profil individuel : formation, bio, compétences, expériences, contact |
| Projets | SIF & SIGFU, Data Engineering GSK & Cartier, BICI, Stellar-IX et autres réalisations |
| Stack | Barres de compétences animées + liste technologies |
| Contact | Formulaire simulé + coordonnées |
| README | Guide de navigation intégré |

## Stack technique

- **HTML5** — `<template>` par app, pas de framework
- **CSS** — variables de thème, animations, Tailwind CSS v4
- **JavaScript Vanilla** — window manager, terminal, canvas mesh animé
- **Polices** — DM Sans (UI) + DM Mono (terminal/code), via Google Fonts

## Installation

```bash
npm install
npm run dev        # http://localhost:3000
```

## Développement

Les fichiers source sont à éditer ; les fichiers de production sont générés :

| Source (à éditer) | Production (généré) |
|-------------------|---------------------|
| `source.html` | `index.html` |
| `assets/css/style.css` | `assets/css/style.min.css` |
| `assets/js/main.js` | `assets/js/main.min.js` |

```bash
npm run watch:css     # recompile style.css → style.min.css en continu
npm run minify:css    # compile CSS une fois
npm run minify:js     # minifie main.js → main.min.js
npm run minify:html   # minifie source.html → index.html
```

## Utilisation

- **Boot log** — défile automatiquement au chargement (~1,3s)
- **Lock screen** — clic ou `Entrée` pour entrer dans le bureau
- **Double-clic** sur une icône pour ouvrir une app
- **Drag** sur la barre de titre pour déplacer une fenêtre
- **Coin inférieur droit** pour redimensionner
- **Clic droit** sur le bureau pour le menu contextuel

## Thème

Variables définies dans `assets/css/style.css` (`:root`) :

```css
--accent: #7B6EFF;      /* violet principal */
--bg: #08080D;          /* fond général */
--surface: #11111A;     /* fond des fenêtres */
--green: #3DD68C;
--coral: #FF7A5C;
--yellow: #F5C842;
```

## Équipe

| Membre | Rôle | Technologies clés |
|--------|------|-------------------|
| **Lionel Ratovo** | Technical Project Lead · Backend & Data Engineer | Java · Node.js · PostgreSQL · Oracle · Docker |
| **Itokiana Rajohnson** | Full Stack Senior · Assistant Chef de Projet | Java · Spring Boot · Angular · Ionic · Scrum |
| **Sitraka Rasatarivony** | Full Stack · DevOps · DevSecOps | Spring Boot · NestJS · FastAPI · React · Docker · CI/CD |

---

© 2025 Nextri · Antananarivo, Madagascar · contact@nextri.dev
