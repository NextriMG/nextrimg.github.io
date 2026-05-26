import { useImperativeHandle, forwardRef, useRef } from 'react'
import gsap from 'gsap'

export interface BootProgressHandle {
  tweenTo: (target: number, duration: number) => void
}

const BootProgress = forwardRef<BootProgressHandle>((_, ref) => {
  const pctRef = useRef(0)

  useImperativeHandle(ref, () => ({
    tweenTo(target, duration) {
      gsap.to(pctRef, {
        current: target,
        duration,
        ease: 'none',
        onUpdate() {
          const v = Math.round(pctRef.current)
          const fill = document.querySelector<HTMLElement>('.bp-fill')
          const pct  = document.querySelector<HTMLElement>('.bp-pct')
          if (fill) fill.style.width = `${v}%`
          if (pct)  pct.textContent  = `${v}%`
        },
      })
    },
  }))

  return (
    <div id="boot-bar">
      <span>[</span>
      <span>LOADING</span>
      <div className="bp-track">
        <div className="bp-fill" />
      </div>
      <span className="bp-pct">0%</span>
      <span>]</span>
    </div>
  )
})

BootProgress.displayName = 'BootProgress'
export default BootProgress
