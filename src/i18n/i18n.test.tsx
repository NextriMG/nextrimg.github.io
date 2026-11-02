import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useDesktopStore } from '../store/desktop'
import Desktop from '../components/desktop/Desktop'
import Menubar from '../components/desktop/Menubar'
import { en } from './en'
import glossary from '../../docs/missions/glossaire-en.md?raw'
import frHtml from '../../index.html?raw'
import enHtml from '../../en/index.html?raw'
import sitemap from '../../public/sitemap.xml?raw'

// Marqueurs de français (spec, étape 5). « Version française » : libellé du lien vers le
// français, volontairement en français.
const FRENCH = /[éèêàçùô]|\b(le|les|des|vous|notre)\b/i
const ALLOWED = ['Version française']
const frenchLines = (texts: string[]) =>
  texts.filter((s) => FRENCH.test(ALLOWED.reduce((acc, a) => acc.split(a).join(''), s)))

// Toutes les chaînes d'un catalogue ; les fonctions sont appelées avec un exemple.
function strings(o: unknown): string[] {
  if (typeof o === 'string') return [o]
  if (typeof o === 'function') return [String(o('X'))]
  if (o && typeof o === 'object') return Object.values(o).flatMap(strings)
  return []
}

// Textes visibles et attributs lus par les lecteurs d'écran.
function domTexts(root: ParentNode): string[] {
  const out: string[] = []
  const walk = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT)
  while (walk.nextNode()) if (walk.currentNode.textContent!.trim()) out.push(walk.currentNode.textContent!.trim())
  root.querySelectorAll('[aria-label],[placeholder],[title]').forEach((el) =>
    ['aria-label', 'placeholder', 'title'].forEach((a) => el.getAttribute(a) && out.push(el.getAttribute(a)!)))
  return out
}

const parse = (html: string) => new DOMParser().parseFromString(html, 'text/html')
const meta = (doc: Document, sel: string) => doc.querySelector(sel)?.getAttribute('content') ?? ''

function resetStore(patch: Partial<ReturnType<typeof useDesktopStore.getState>> = {}) {
  useDesktopStore.setState({
    phase: 'desktop', openWindows: [], reducedWindows: [], focusedWindow: null,
    teamMode: 'col', guideActive: false, ...patch,
  })
}

describe('version anglaise : aucun texte français', () => {
  beforeEach(() => {
    document.documentElement.lang = 'en'
    localStorage.setItem('nxt-g', '1')
  })
  afterEach(() => {
    document.documentElement.lang = ''
    localStorage.clear()
    vi.unstubAllEnvs()
  })

  it('catalogue anglais complet', () => {
    expect(frenchLines(strings(en))).toEqual([])
  })

  it.each(['col', 'exp'] as const)('bureau et toutes les fenêtres ouvertes (équipe : %s)', (teamMode) => {
    resetStore({ openWindows: ['a', 't', 's', 'c'], teamMode })
    const { container } = render(<Desktop />)
    expect(frenchLines(domTexts(container))).toEqual([])
  })

  it.each(['true', 'false'])('formulaire de contact et ses erreurs (envoi activé : %s)', (enabled) => {
    vi.stubEnv('VITE_CONTACT_ENABLED', enabled)
    resetStore({ openWindows: ['c'] })
    const { container } = render(<Desktop />)
    fireEvent.click(container.querySelector('#wc .btn-p')!)
    const email = container.querySelector<HTMLInputElement>('#cf-e')
    if (enabled === 'true' && email) {
      fireEvent.change(email, { target: { value: 'pas-un-email' } })
      fireEvent.click(container.querySelector('#wc .btn-p')!)
    }
    expect(frenchLines(domTexts(container))).toEqual([])
  })

  it('les six étapes du guide', async () => {
    localStorage.clear() // pas de nxt-g : le dock lance le guide
    resetStore()
    render(<Desktop />)
    const seen: string[] = []
    for (let i = 0; i < 6; i++) {
      const pop = await waitFor(() => {
        const p = document.querySelector('.driver-popover')
        expect(p?.textContent).toBeTruthy()
        expect(seen).not.toContain(p!.textContent)
        return p!
      })
      seen.push(pop.textContent!)
      fireEvent.click(document.querySelector('.driver-popover-next-btn')!)
    }
    expect(seen).toHaveLength(6)
    expect(frenchLines(seen)).toEqual([])
  })
})

describe('glossaire', () => {
  it('chaque traduction du glossaire est utilisée telle quelle', () => {
    const doc = parse(enHtml)
    const metas = [...doc.querySelectorAll('meta[content]')].map((m) => m.getAttribute('content')!)
    const corpus = [...strings(en), ...metas, doc.body.textContent!].join('\n').toLowerCase()
    const terms = glossary
      .split('\n')
      .filter((l) => l.startsWith('|') && !l.startsWith('|---') && !l.startsWith('| FR |'))
      .map((l) => l.split('|')[2].trim())
    expect(terms.length).toBeGreaterThan(50)
    const missing = terms.filter((term) => {
      const variants = [term, term.replace('(s)', ''), ...term.split(' / ')]
      return !variants.some((v) => corpus.includes(v.toLowerCase()))
    })
    expect(missing).toEqual([])
  })
})

describe('changement de langue', () => {
  afterEach(() => {
    document.documentElement.lang = ''
    localStorage.clear()
  })

  it.each([
    ['fr', 'EN', '/en/', 'en'],
    ['en', 'FR', '/', 'fr'],
  ])('page %s : lien %s vers %s, choix enregistré', (lang, label, href, stored) => {
    document.documentElement.lang = lang
    const { container } = render(<Menubar />)
    const link = container.querySelector<HTMLAnchorElement>('.mb-lang')!
    expect(link.textContent).toBe(label)
    expect(link.getAttribute('href')).toBe(href)
    link.addEventListener('click', (e) => e.preventDefault()) // jsdom ne navigue pas
    fireEvent.click(link)
    expect(localStorage.getItem('nxt-lang')).toBe(stored)
  })

  it.each([
    ['en', true],
    ['fr', false],
    [null, false],
  ])('page française : choix mémorisé %s → redirection vers /en/ : %s', (stored, redirects) => {
    const code = [...parse(frHtml).querySelectorAll('script:not([src]):not([type])')]
      .map((s) => s.textContent).join(';')
    const replace = vi.fn()
    const storage = { getItem: () => stored }
    new Function('document', 'localStorage', 'location', code)(document, storage, { replace })
    expect(replace.mock.calls).toEqual(redirects ? [['/en/']] : [])
  })
})

describe('pages HTML', () => {
  const pages = [
    { lang: 'fr', url: 'https://nextrimg.github.io/', locale: 'fr_FR', alt: 'en_US', doc: parse(frHtml) },
    { lang: 'en', url: 'https://nextrimg.github.io/en/', locale: 'en_US', alt: 'fr_FR', doc: parse(enHtml) },
  ]

  it.each(pages)('$lang : lang, canonical, og:locale', ({ lang, url, locale, alt, doc }) => {
    expect(doc.documentElement.lang).toBe(lang)
    expect(doc.querySelector('link[rel=canonical]')?.getAttribute('href')).toBe(url)
    expect(meta(doc, 'meta[property="og:url"]')).toBe(url)
    expect(meta(doc, 'meta[property="og:locale"]')).toBe(locale)
    expect(meta(doc, 'meta[property="og:locale:alternate"]')).toBe(alt)
  })

  it.each(pages)('$lang : hreflang réciproques et x-default', ({ doc }) => {
    const links = Object.fromEntries(
      [...doc.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]),
    )
    expect(links).toEqual({
      fr: 'https://nextrimg.github.io/',
      en: 'https://nextrimg.github.io/en/',
      'x-default': 'https://nextrimg.github.io/',
    })
  })

  it.each(pages)('$lang : meta, JSON-LD et résumé sans JS dans la bonne langue', ({ lang, doc }) => {
    const texts = [
      doc.title,
      meta(doc, 'meta[name=description]'),
      meta(doc, 'meta[property="og:title"]'),
      meta(doc, 'meta[property="og:description"]'),
      meta(doc, 'meta[name="twitter:title"]'),
      meta(doc, 'meta[name="twitter:description"]'),
      JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!).description,
      doc.querySelector('#root')!.textContent!,
    ]
    if (lang === 'en') expect(frenchLines(texts)).toEqual([])
    else expect(texts.slice(1).every((s) => FRENCH.test(s))).toBe(true)
  })

  it('sitemap : les deux URL', () => {
    const locs = [...parse(sitemap).querySelectorAll('loc')].map((l) => l.textContent)
    expect(locs).toEqual(['https://nextrimg.github.io/', 'https://nextrimg.github.io/en/'])
  })
})
