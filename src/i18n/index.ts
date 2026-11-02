import { fr, type Messages } from './fr'

// Textes de la langue de la page. Lu à chaque appel (pas en constante de module) pour que
// les tests puissent changer `document.documentElement.lang`.
export function t(): Messages {
  return fr
}
