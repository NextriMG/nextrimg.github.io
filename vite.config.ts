import { createHash } from 'node:crypto'
import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages n'émet aucun en-tête HTTP personnalisé : la seule politique de
 * sécurité que ce site peut poser est un `<meta http-equiv>`. Cela couvre la
 * CSP et rien d'autre — `frame-ancestors`, `X-Frame-Options`,
 * `X-Content-Type-Options` et `Permissions-Policy` n'existent qu'en en-tête et
 * resteront hors de portée tant que l'hébergeur ne change pas. Un scan
 * securityheaders.com ne verra jamais ce meta ; ce qu'il protège, c'est le
 * navigateur, pas la note.
 *
 * La balise est injectée à la construction seulement : en développement, Vite
 * a besoin d'`eval` et d'un WebSocket pour le rechargement à chaud, et une
 * CSP stricte casserait le serveur de dev sans rien protéger en local.
 *
 * `script-src` est la directive qui compte, donc elle ne contient pas
 * `'unsafe-inline'` : le seul script en ligne de index.html est le JSON-LD, et
 * son empreinte est recalculée ici à chaque construction. Le modifier ne
 * demande donc aucune mise à jour manuelle.
 */
function csp(): Plugin {
  const ORIGINS = {
    turnstile: 'https://challenges.cloudflare.com', // le script et son iframe
    web3forms: 'https://api.web3forms.com', // le POST du formulaire de contact
    fontsCss: 'https://fonts.googleapis.com',
    fontsFiles: 'https://fonts.gstatic.com',
  }

  return {
    name: 'nextri-csp',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const hashes = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
          .map((m) => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`)

        const policy = [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          // Le formulaire part en fetch(), pas en submit natif : rien à poster ailleurs.
          "form-action 'self'",
          `script-src 'self' ${ORIGINS.turnstile} ${hashes.join(' ')}`,
          // `'unsafe-inline'` sans hachage, sinon il serait ignoré : React,
          // Framer Motion, GSAP et driver.js posent tous des attributs
          // `style="…"`, qu'aucun hachage ne peut couvrir. Ce que cela ouvre
          // c'est la mise en forme, pas l'exécution.
          `style-src 'self' 'unsafe-inline' ${ORIGINS.fontsCss}`,
          `font-src 'self' ${ORIGINS.fontsFiles}`,
          // `data:` porte le grain, encodé en SVG dans index.css.
          "img-src 'self' data:",
          `connect-src 'self' ${ORIGINS.web3forms}`,
          `frame-src ${ORIGINS.turnstile}`,
          "manifest-src 'self'",
          "worker-src 'self' blob:",
          'upgrade-insecure-requests',
        ].join('; ')

        return [
          {
            tag: 'meta',
            attrs: { 'http-equiv': 'Content-Security-Policy', content: policy },
            injectTo: 'head-prepend' as const,
          },
        ]
      },
    },
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    csp(),
  ],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
