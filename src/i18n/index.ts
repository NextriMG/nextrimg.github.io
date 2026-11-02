import { fr, type Messages } from './fr'
import { en } from './en'

// Textes de la langue de la page (`<html lang>` de index.html ou en/index.html). Lu à chaque
// appel, pas en constante de module, pour que les tests puissent changer la langue.
export function t(): Messages {
  return document.documentElement.lang === 'en' ? en : fr
}
