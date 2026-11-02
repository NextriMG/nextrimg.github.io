// Textes affichés par l'application. Le catalogue anglais (en.ts) a le type `Messages` :
// une clé ajoutée ici sans traduction casse `tsc`. Garder aligné le résumé sans JS de index.html.

// Élision : « de Lionel », « d'Itokiana ».
const de = (name: string) => (/^[AEIOUY]/i.test(name) ? `d'${name}` : `de ${name}`)

export const fr = {
  // Sélecteur de langue du menubar : pointe vers l'autre langue.
  lang: {
    switchTo: 'EN',
    switchLabel: 'English version',
    switchHref: 'en/', // relatif à BASE_URL
    switchLang: 'en',
  },
  menubar: {
    label: 'Menu principal',
    themeToggle: 'Basculer thème sombre/clair',
  },
  nav: {
    about: 'À propos',
    team: "L'équipe",
    services: 'Services',
    contact: 'Contact',
  },
  dock: {
    label: 'Navigation principale',
    guideLabel: "Guide d'utilisation",
    guide: 'Guide',
  },
  windows: {
    about: 'À propos de NEXTRI',
    team: "L'équipe NEXTRI",
    services: 'Nos services',
    contact: 'Prendre contact',
    close: 'Fermer',
    reduce: 'Réduire',
    maximize: 'Agrandir',
  },
  hero: {
    label: 'Message principal',
    title1: 'Co-construire vos',
    title2: 'ambitions digitales.',
    lead: 'Un collectif de trois ingénieurs : une équipe ou un expert, selon vos besoins.',
    services: 'Voir nos services',
    team: "Rencontrer l'équipe",
  },
  about: {
    title: 'Trois experts. Une équipe. Votre livrable.',
    intro:
      "NEXTRI est un collectif de trois ingénieurs logiciels basé à Antananarivo. Nous accompagnons entreprises, startups et porteurs de projets dans la conception, le développement et l'évolution de produits digitaux fiables.",
    modesTitle: 'Deux façons de travailler ensemble',
    collectiveTitle: 'Mode Collectif',
    collectiveText:
      'Projets complets : SaaS, plateformes web, systèmes complexes. Architecture + Backend + Frontend + DevOps en équipe unifiée, responsabilité partagée du livrable.',
    expertTitle: 'Mode Expert',
    expertText:
      "Chaque membre intervient de façon autonome sur un besoin précis. La souplesse d'un freelance, avec la fiabilité d'un collectif derrière le profil engagé.",
    commitmentTitle: 'Notre engagement',
    commitmentText:
      'Transparence dans les choix techniques, code maintenable sans dette cachée, réponse garantie sous 24h. Des solutions pensées pour durer.',
    cta: "Rencontrer l'équipe →",
  },
  services: {
    intro: "De la conception à la production, nous couvrons l'ensemble du cycle de vie de votre projet digital.",
    webTitle: 'Développement web sur mesure',
    webText: 'Plateformes métiers, SaaS, tableaux de bord, outils internes et portails clients adaptés à vos besoins réels.',
    backendTitle: 'Backend & Architecture',
    backendText: "APIs robustes, architectures scalables conçues pour supporter la croissance et l'évolution fonctionnelle.",
    infraTitle: 'Infrastructure & Data',
    infraText: 'Environnements fiables, déploiements automatisés, modélisation de bases de données, traitement des données.',
    auditTitle: 'Audit & Conseil',
    auditText: "Analyse de l'existant, refactoring, optimisation des performances et accompagnement stratégique technique.",
    ctaText: 'Vous avez un projet en tête ? Parlons-en.',
    cta: 'Démarrer un projet →',
  },
  team: {
    modeLabel: "Mode d'intervention",
    tabCollective: 'Collectif',
    tabExpert: 'Mode Expert',
    collectiveDesc:
      'En mode collectif, les trois membres travaillent comme une équipe unifiée avec une coordination interne fluide et une responsabilité partagée du livrable.',
    expertDesc:
      "En mode expert, chaque membre intervient de façon autonome sous l'identité NEXTRI. La souplesse d'un freelance avec la fiabilité d'un collectif derrière.",
    portfolio: (name: string) => `Portfolio ${de(name)}`,
    linkedin: (name: string) => `Profil LinkedIn ${de(name)}`,
    github: (name: string) => `Profil GitHub ${de(name)}`,
    lionel: {
      role: 'Full Stack Java · Technico-fonctionnel',
      duty: 'Coordinateur opérationnel · Commercial',
      expertRole: 'Consultant full-stack Java',
      expertDesc:
        'Applications métier Java Spring Boot, règles et workflows Drools et Camunda, interfaces Angular sur PostgreSQL. Ateliers métier, spécifications et encadrement technique.',
    },
    itokiana: {
      role: 'Full Stack Senior · Chef de Projet',
      duty: 'Référent administratif',
      expertRole: 'Full Stack Senior · PM',
      expertDesc:
        'Applications en production, spécifications techniques, cycles de tests, interface fonctionnel/technique.',
    },
    sitraka: {
      role: 'Full Stack · Backend, CI/CD',
      duty: 'Responsable technique',
      expertRole: 'Full Stack · Backend, CI/CD',
      expertDesc:
        "Conception d'API et refonte de backends sous contrainte de performance, modélisation et optimisation des données, livraison continue, sécurité applicative dès la conception.",
    },
  },
  contact: {
    intro: 'Réponse garantie sous 24h. Décrivez-nous votre projet.',
    name: 'Votre nom',
    namePlaceholder: 'Jean Dupont',
    email: 'Adresse email',
    emailPlaceholder: 'jean@startup.com',
    type: "Type d'intervention",
    typeSelect: 'Sélectionner...',
    typeOptions: [
      'Développement produit complet',
      'Mission backend / API',
      'Mission frontend',
      'Infrastructure / Data',
      'Audit technique',
      'Autre',
    ],
    message: 'Décrivez votre besoin',
    messagePlaceholder: 'Nous construisons une plateforme SaaS et avons besoin...',
    send: 'Envoyer →',
    sending: 'Envoi…',
    retryIn: (s: number) => `Réessayer dans ${s}s`,
    required: 'Requis',
    invalidEmail: 'Email invalide',
    errorServer: 'Une erreur est survenue. Réessayez dans un moment.',
    errorNetwork: "Impossible d'envoyer le message. Vérifiez votre connexion.",
    errorExpired: 'Session de vérification expirée. Veuillez réessayer.',
    privacy: 'Vos informations ne sont utilisées que pour répondre à votre message et ne sont jamais partagées.',
    successTitle: 'Message bien reçu !',
    successText: 'Nous vous répondrons dans les 24 heures.',
    successUrgent: 'Pour toute urgence :',
  },
  guide: {
    next: 'Suivant →',
    prev: '← Retour',
    done: "C'est parti !",
    dockTitle: 'Bienvenue sur NEXTRI OS',
    dockText: "Ce dock est votre point d'entrée. Cliquez sur une icône pour ouvrir la section correspondante.",
    aboutTitle: 'À propos',
    aboutText: "Découvrez NEXTRI, notre approche et nos deux modes d'intervention.",
    teamTitle: "L'équipe",
    teamText: 'Rencontrez les trois membres. Le toggle "Collectif / Expert" vous explique comment nous intervenons selon vos besoins.',
    servicesTitle: 'Nos services',
    servicesText: 'Développement web, backend, infrastructure, audit : tout ce que nous faisons.',
    contactTitle: 'Nous contacter',
    contactText: 'Décrivez votre projet et recevez une réponse sous 24h.',
    themeTitle: 'Thème sombre / clair',
    themeText: 'Basculez entre les deux modes selon vos préférences.',
  },
}

export type Messages = typeof fr
