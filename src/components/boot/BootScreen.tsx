import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useDesktopStore } from '../../store/desktop'
import BootStrip, { type BootStripHandle } from './BootStrip'
import BootProgress, { type BootProgressHandle } from './BootProgress'

gsap.registerPlugin(useGSAP)

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

const STRIP_DURATION = 2000

const NEX_LETTERS = ['N', 'E', 'X'] as const
const TRI_LETTERS = ['T', 'R', 'I'] as const

function LetterSpans({ chars }: { chars: readonly string[] }) {
  return (
    <>
      {chars.map((char) => (
        <div key={char} className="bl">
          <span className="bl-base">{char}</span>
          <span className="bl-fill" aria-hidden="true">{char}</span>
        </div>
      ))}
    </>
  )
}

export default function BootScreen() {
  const bootRef     = useRef<HTMLDivElement>(null)
  const stripRef    = useRef<BootStripHandle>(null)
  const progressRef = useRef<BootProgressHandle>(null)
  const setPhase    = useDesktopStore((s) => s.setPhase)

  useGSAP(() => {
    // Closure-scoped flag: each effect invocation owns its own copy.
    // React Strict Mode fires cleanup then re-runs the effect; using a shared
    // ref would let the first run's coroutine survive the cleanup because the
    // second invocation resets the flag before the first await resumes.
    let aborted = false
    const prog = progressRef.current

    const run = async () => {
      // Pre-query all elements as direct references so GSAP scope (bootRef)
      // never blocks selectors that live outside or at the root of #boot.
      const bootEl  = bootRef.current!
      const nexEl   = bootEl.querySelector<HTMLElement>('#boot-nex')!
      const triEl   = bootEl.querySelector<HTMLElement>('#boot-tri')!
      const splitEl = bootEl.querySelector<HTMLElement>('#boot-split')!
      const stripEl = bootEl.querySelector<HTMLElement>('#boot-strip')!
      const logoEl    = document.querySelector<HTMLElement>('.mb-logo')!
      const heroEl    = document.querySelector<HTMLElement>('#hero')!
      const dockEl    = document.querySelector<HTMLElement>('#dk-wrap')!
      const overlayEl = bootEl.querySelector<HTMLElement>('#boot-overlay')!

      // All synchronous sets below are captured by the GSAP Context and
      // auto-reverted when the effect cleans up (React Strict Mode or unmount).
      gsap.set(logoEl, { opacity: 0 })
      // Offset hero/dock below their natural position; opacity stays at CSS
      // default (1); the overlay covers them until it fades in Phase E.
      gsap.set(heroEl, { y: 48 })
      gsap.set(dockEl, { y: 40 })

      // ── Phase A: NEXTRI fades in as one merged word ──────────────────────
      // Strip removed from flex layout so the two halves sit side-by-side
      gsap.set(stripEl, { display: 'none' })
      gsap.set(splitEl, { gap: 0 })

      await sleep(100)
      if (aborted) return

      gsap.fromTo(
        [nexEl, triEl],
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      prog?.tweenTo(18, 0.5)

      // ── Phase B: split apart, strip stays hidden ────────────────────────
      await sleep(300)
      if (aborted) return

      // FLIP: put strip back in layout (invisible) so NEX/TRI animate
      // to their natural split positions without a visual pop
      const nexLeft0 = nexEl.getBoundingClientRect().left
      const triLeft0 = triEl.getBoundingClientRect().left

      gsap.set(stripEl, { clearProps: 'display', opacity: 0 })
      gsap.set(splitEl, { clearProps: 'gap' })

      gsap.set(nexEl, { x: nexLeft0 - nexEl.getBoundingClientRect().left })
      gsap.set(triEl, { x: triLeft0 - triEl.getBoundingClientRect().left })

      gsap.to(nexEl, { x: 0, duration: 0.55, ease: 'power2.inOut' })
      gsap.to(triEl, { x: 0, duration: 0.55, ease: 'power2.inOut' })
      prog?.tweenTo(25, 0.55)
      await sleep(560)

      // ── Phase C: strip appears, then cycles ─────────────────────────────
      if (aborted) return

      gsap.fromTo(stripEl, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' })
      stripRef.current?.start(STRIP_DURATION)
      prog?.tweenTo(72, STRIP_DURATION / 1000)
      await sleep(STRIP_DURATION)
      if (aborted) return
      stripRef.current?.stop()

      // ── Phase D: merge back ──────────────────────────────────────────────
      await sleep(150)
      if (aborted) return

      const Δ = (triEl.getBoundingClientRect().left - nexEl.getBoundingClientRect().right) / 2
      gsap.to(nexEl,   { x: Δ,  duration: 0.4, ease: 'power2.inOut' })
      gsap.to(triEl,   { x: -Δ, duration: 0.4, ease: 'power2.inOut' })
      gsap.to(stripEl, { opacity: 0, duration: 0.3 })
      prog?.tweenTo(83, 0.4)
      await sleep(420)

      // ── Phase E: fly to menubar corner ──────────────────────────────────
      if (aborted) return

      gsap.set(stripEl, { display: 'none' })
      gsap.set(nexEl,   { x: 0 })
      gsap.set(triEl,   { x: 0 })
      gsap.set(splitEl, { gap: 0 })

      const splitRect = splitEl.getBoundingClientRect()
      const logoRect  = logoEl.getBoundingClientRect()

      // Scale by font-size ratio, more accurate than element height
      const splitFontPx = parseFloat(getComputedStyle(nexEl).fontSize)
      const logoFontPx  = parseFloat(getComputedStyle(logoEl).fontSize)
      const scaleRatio  = logoFontPx / splitFontPx

      const dx = (logoRect.left + logoRect.width  / 2) - (splitRect.left + splitRect.width  / 2)
      const dy = (logoRect.top  + logoRect.height / 2) - (splitRect.top  + splitRect.height / 2)

      prog?.tweenTo(100, 0.5)
      gsap.to(splitEl, { x: dx, y: dy, scale: scaleRatio, duration: 0.55, ease: 'power3.inOut' })

      // Wait for progress to reach 100, then fade the bar out before revealing desktop
      await sleep(500)
      if (aborted) return

      const barEl = bootEl.querySelector<HTMLElement>('#boot-bar')!
      await new Promise<void>((res) => gsap.to(barEl, { opacity: 0, duration: 0.25, ease: 'power1.in', onComplete: res }))
      if (aborted) return

      // ── Cascade: bar gone → overlay fades, hero/dock slide up ───────────
      // Fading the overlay (not the whole #boot) lets the NEXTRI split stay
      // visible on top while the desktop emerges beneath it, so no empty viewport.
      gsap.to(overlayEl, { opacity: 0, duration: 0.65, ease: 'power2.out' })
      gsap.to(heroEl,    { y: 0, duration: 0.7, ease: 'power2.out', delay: 0.05 })
      gsap.to(dockEl,    {
        y: 0, duration: 0.6, ease: 'power2.out', delay: 0.15,
        // Release GSAP's hold on `transform` so CSS translateX(-50%) governs
        // centering again, important for correct behaviour on viewport resize.
        onComplete: () => gsap.set(dockEl, { clearProps: 'transform' }),
      })

      // Fly completed ~200 ms ago; give cascade time to establish before squash-bounce
      await sleep(350)

      // ── Phase G: letter squash-bounce settle ─────────────────────────────
      if (aborted) return

      const letterDivs = splitEl.querySelectorAll<HTMLElement>('.bl')
      gsap.set(letterDivs, { transformOrigin: 'center bottom' })

      await new Promise<void>((res) => {
        gsap.timeline({ onComplete: res })
          .to(letterDivs, { scaleX: 1.6, scaleY: 0.45, duration: 0.06, stagger: 0.035, ease: 'none' })
          .to(letterDivs, { scaleX: 1,   scaleY: 1,    duration: 0.35, stagger: 0.035, ease: 'elastic.out(1.1, 0.5)' }, '<0.03')
      })

      // Snap real logo in, fade boot screen out
      if (aborted) return
      gsap.set(logoEl, { opacity: 1 })
      gsap.to(bootEl, {
        opacity: 0, duration: 0.3,
        onComplete: () => setPhase('desktop'),
      })
    }

    run()

    return () => {
      aborted = true
      stripRef.current?.stop()
      // All three elements live outside the GSAP scope, so kill their tweens and
      // clear inline styles so context revert leaves them in a clean CSS state.
      const logoEl = document.querySelector<HTMLElement>('.mb-logo')
      if (logoEl) { gsap.killTweensOf(logoEl); gsap.set(logoEl, { clearProps: 'opacity' }) }
      const heroEl = document.querySelector<HTMLElement>('#hero')
      if (heroEl) { gsap.killTweensOf(heroEl); gsap.set(heroEl, { clearProps: 'all' }) }
      const dockEl = document.querySelector<HTMLElement>('#dk-wrap')
      if (dockEl) { gsap.killTweensOf(dockEl); gsap.set(dockEl, { clearProps: 'all' }) }
    }
  }, { scope: bootRef })

  return (
    <div id="boot" ref={bootRef}>
      <div id="boot-overlay" />
      <div id="boot-split">
        <div id="boot-nex"><LetterSpans chars={NEX_LETTERS} /></div>
        <BootStrip ref={stripRef} />
        <div id="boot-tri"><LetterSpans chars={TRI_LETTERS} /></div>
      </div>
      <BootProgress ref={progressRef} />
    </div>
  )
}
