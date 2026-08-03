import { useRef, useLayoutEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore } from '../../store/desktop'
import type { WindowId } from '../../types'

interface Props {
  id: WindowId
  title: string
  children: ReactNode
}

export default function WindowShell({ id, title, children }: Props) {
  const { openWindows, reducedWindows, zMap, closeWindow, focusWindow, reduceWindow, guideActive } = useDesktopStore()
  const isOpen = openWindows.includes(id)
  const isReduced = reducedWindows.includes(id)
  const winRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isOpen || isReduced || window.innerWidth < 1024) return
    const win = winRef.current
    if (!win) return
    const deskH = window.innerHeight - 28
    const safeBottom = deskH - 88
    const top = win.offsetTop
    const h = win.offsetHeight
    if (top + h > safeBottom) {
      win.style.top = Math.max(10, safeBottom - h) + 'px'
    }
  }, [isOpen, isReduced])

  const handleTitleBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return
    if ((e.target as HTMLElement).closest('.wb')) return
    if (isReduced) return

    const win = winRef.current!
    const startLeft = win.offsetLeft
    const startTop = win.offsetTop
    const originX = e.clientX
    const originY = e.clientY

    win.style.left = startLeft + 'px'
    win.style.top = startTop + 'px'
    win.style.right = 'auto'

    focusWindow(id)

    const onMove = (ev: MouseEvent) => {
      win.style.left = startLeft + (ev.clientX - originX) + 'px'
      win.style.top = Math.max(4, startTop + (ev.clientY - originY)) + 'px'
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    e.preventDefault()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={winRef}
          className="win"
          id={`w${id}`}
          role="dialog"
          aria-labelledby={`w${id}-t`}
          aria-modal="false"
          style={{
            zIndex: (guideActive ? 10000 : 0) + (zMap[id] ?? 50),
            pointerEvents: isReduced ? 'none' : undefined,
          }}
          initial={{ scale: 0.88, opacity: 0, y: 0 }}
          animate={isReduced
            ? { scale: 0.5, opacity: 0, y: 60 }
            : { scale: 1, opacity: 1, y: 0 }
          }
          exit={{ scale: 0.88, opacity: 0, y: 0 }}
          transition={{ duration: 0.24, ease: [0.34, 1.56, 0.64, 1] }}
          onMouseDown={() => !isReduced && focusWindow(id)}
        >
          <div className="wbar" onMouseDown={handleTitleBarMouseDown}>
            <button
              className="wb wb-c"
              onClick={() => closeWindow(id)}
              aria-label="Fermer"
            />
            <button
              className="wb wb-m"
              onClick={() => reduceWindow(id)}
              aria-label="Réduire"
            />
            <button className="wb wb-x" aria-label="Agrandir" disabled />
            <h2 className="wtit" id={`w${id}-t`}>{title}</h2>
          </div>
          <div className="wbody">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
