// Audit des versions française et anglaise d'un site servi (production ou `npm run preview`).
// Usage : node scripts/audit-en.mjs [URL de base]   (défaut : https://nextrimg.github.io/)
// Sortie : code 1 et liste des échecs si un contrôle échoue.

const PROD = 'https://nextrimg.github.io/'
const BASE = new URL(process.argv[2] ?? PROD).href
const FRENCH = /[éèêàçùô]|\b(le|les|des|vous|notre)\b/i
const ALLOWED = 'Version française' // lien vers le français, présent sur la page anglaise

const PAGES = [
  { path: '', lang: 'fr', locale: 'fr_FR' },
  { path: 'en/', lang: 'en', locale: 'en_US' },
]
const ALTERNATES = { fr: PROD, en: `${PROD}en/`, 'x-default': PROD }

const failures = []
const check = (ok, msg) => { if (!ok) failures.push(msg) }

// Les URL absolues de production pointent vers la base auditée (utile en local).
const local = (url) => (url.startsWith(PROD) ? BASE + url.slice(PROD.length) : url)

const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '')
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? []
const metaContent = (html, key) =>
  attr(tags(html, 'meta').find((t) => attr(t, 'property') === key || attr(t, 'name') === key) ?? '', 'content')
const isFrench = (s) => FRENCH.test(s.split(ALLOWED).join(''))

async function get(url) {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    return { status: res.status, text: await res.text() }
  } catch (e) {
    return { status: 0, text: String(e) }
  }
}

const internal = new Set()

for (const { path, lang, locale } of PAGES) {
  const url = BASE + path
  const { status, text: html } = await get(url)
  check(status === 200, `${url} : HTTP ${status}`)
  if (status !== 200) continue

  check(html.match(/<html\b[^>]*\blang="([^"]*)"/)?.[1] === lang, `${url} : <html lang> ≠ ${lang}`)
  check(metaContent(html, 'og:locale') === locale, `${url} : og:locale ≠ ${locale}`)

  const texts = {
    description: metaContent(html, 'description'),
    'og:title': metaContent(html, 'og:title'),
    'og:description': metaContent(html, 'og:description'),
    'twitter:title': metaContent(html, 'twitter:title'),
    'twitter:description': metaContent(html, 'twitter:description'),
    'JSON-LD': JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? '{}').description ?? '',
    'résumé sans JS': (html.match(/<div id="root">([\s\S]*?)<\/div>/)?.[1] ?? '').replace(/<[^>]+>/g, ' '),
  }
  for (const [name, value] of Object.entries(texts)) {
    check(value.trim() !== '', `${url} : ${name} absent`)
    if (value.trim()) check(isFrench(value) === (lang === 'fr'), `${url} : ${name} pas en ${lang} : « ${value.trim().slice(0, 80)} »`)
  }

  const alternates = Object.fromEntries(
    tags(html, 'link').filter((t) => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang')).map((t) => [attr(t, 'hreflang'), attr(t, 'href')]),
  )
  check(JSON.stringify(alternates) === JSON.stringify(ALTERNATES), `${url} : hreflang ${JSON.stringify(alternates)} ≠ ${JSON.stringify(ALTERNATES)}`)

  // Liens internes et assets
  for (const t of [...tags(html, 'link'), ...tags(html, 'script'), ...tags(html, 'img'), ...tags(html, 'a')]) {
    const ref = attr(t, 'href') || attr(t, 'src')
    if (!ref || ref.startsWith('#') || ref.startsWith('mailto:')) continue
    const abs = new URL(local(ref), url).href
    if (abs.startsWith(BASE)) internal.add(abs)
  }
  const ogImage = metaContent(html, 'og:image')
  if (ogImage) internal.add(local(ogImage))
}

const sitemap = await get(`${BASE}sitemap.xml`)
check(sitemap.status === 200, `sitemap.xml : HTTP ${sitemap.status}`)
const locs = [...sitemap.text.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
for (const u of [PROD, `${PROD}en/`]) check(locs.includes(u), `sitemap.xml : ${u} absente`)

for (const u of internal) {
  const { status } = await get(u)
  check(status === 200, `${u} : HTTP ${status}`)
}

if (failures.length) {
  console.error(`Audit ${BASE} : ${failures.length} échec(s)\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log(`Audit ${BASE} : OK (2 pages, sitemap, ${internal.size} liens et assets internes)`)
