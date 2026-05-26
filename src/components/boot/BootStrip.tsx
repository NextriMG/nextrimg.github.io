import { useImperativeHandle, forwardRef, useRef } from 'react'
import gsap from 'gsap'

type FrameType = 'logo' | 'avatar'

interface Frame {
  src: string
  bg: string
  type: FrameType
}

const FRAMES: Frame[] = [
  { src: '/1.svg', bg: 'linear-gradient(145deg, #E8621A 0%, #F5C842 100%)', type: 'logo' },
  { src: '/2.svg', bg: 'linear-gradient(145deg, #2BBFB3 0%, #9B8FD9 100%)', type: 'logo' },
  { src: '/3.svg', bg: 'linear-gradient(145deg, #9B8FD9 0%, #E8621A 100%)', type: 'logo' },
  { src: '/4.svg', bg: 'linear-gradient(145deg, #E8621A 0%, #F5C842 100%)', type: 'logo' },
  { src: '/5.svg', bg: 'linear-gradient(145deg, #2BBFB3 0%, #9B8FD9 100%)', type: 'logo' },
  { src: '/6.svg', bg: 'linear-gradient(145deg, #9B8FD9 0%, #E8621A 100%)', type: 'logo' },
  { src: '/7.svg', bg: 'linear-gradient(145deg, #E8621A 0%, #F5C842 100%)', type: 'logo' },
  { src: '/8.svg', bg: 'linear-gradient(145deg, #2BBFB3 0%, #9B8FD9 100%)', type: 'logo' },
  { src: '/9.svg', bg: 'linear-gradient(145deg, #9B8FD9 0%, #E8621A 100%)', type: 'logo' },
  { src: '/avatars/sitraka.png',  bg: 'var(--tx)', type: 'avatar' },
  { src: '/avatars/lionel.png',   bg: 'var(--tx)', type: 'avatar' },
  { src: '/avatars/itokiana.png', bg: 'var(--tx)', type: 'avatar' },
]

export interface BootStripHandle {
  start: (totalMs?: number) => void
  stop: () => void
}

const BootStrip = forwardRef<BootStripHandle>((_, ref) => {
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useImperativeHandle(ref, () => ({
    start(totalMs = 2000) {
      const slots = document.querySelectorAll<HTMLElement>('#boot-strip .ss')
      if (!slots.length) return
      const count = slots.length
      const n = count - 1

      // Sinusoidal bell curve: weight is highest at the edges (slow) and lowest
      // at the centre (fast), giving a cinematic slow→fast→slow rhythm while
      // keeping even the fastest frame above ~100 ms so every logo is legible.
      const weights = Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n
        return 0.4 + 0.6 * (1 - Math.sin(t * Math.PI))
      })
      const totalWeight = weights.reduce((a, b) => a + b, 0)

      const tl = gsap.timeline()
      gsap.set(slots[0], { opacity: 1 })

      let t = 0
      for (let i = 0; i < n; i++) {
        const dur = (weights[i] / totalWeight) * totalMs
        const fade = Math.min(dur * 0.25, 60) / 1000
        tl.to(slots[i],     { opacity: 0, duration: fade }, t / 1000)
        tl.to(slots[i + 1], { opacity: 1, duration: fade }, t / 1000)
        t += dur
      }

      tlRef.current = tl
    },
    stop() {
      tlRef.current?.kill()
      tlRef.current = null
    },
  }))

  return (
    <div id="boot-strip">
      {FRAMES.map(({ src, bg, type }) => (
        <div key={src} className={`ss ${type}`} style={{ background: bg }}>
          <img src={src} alt="" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
})

BootStrip.displayName = 'BootStrip'
export default BootStrip
