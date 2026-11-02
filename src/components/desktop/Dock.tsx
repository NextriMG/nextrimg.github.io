import { useEffect } from 'react'
import { Info, Users, Code2, Mail, HelpCircle } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'
import { useGuide } from '../../hooks/useGuide'
import type { WindowId } from '../../types'
import { t } from '../../i18n'

interface DockItemProps {
  id: WindowId
  label: string
  icon: React.ReactNode
  colorClass: string
}

function DockItem({ id, label, icon, colorClass }: DockItemProps) {
  const { openWindows, reducedWindows, focusedWindow, openWindow, reduceWindow, restoreWindow, focusWindow } = useDesktopStore()
  const isOpen = openWindows.includes(id)
  const isReduced = reducedWindows.includes(id)
  const isFocused = focusedWindow === id

  const handleClick = () => {
    if (!isOpen) {
      openWindow(id)
    } else if (isReduced) {
      restoreWindow(id)
    } else if (isFocused) {
      reduceWindow(id)
    } else {
      focusWindow(id)
    }
  }

  const stateClass = isReduced ? ' reduced' : isOpen ? ' open' : ''

  return (
    <div
      className={`di${stateClass}`}
      id={`di-${id}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={label}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={`di-i ${colorClass}`}>{icon}</div>
      <div className="tip">{label}</div>
      <div className="dot" />
    </div>
  )
}

export default function Dock() {
  const { start } = useGuide()
  const phase = useDesktopStore((s) => s.phase)

  useEffect(() => {
    if (phase !== 'desktop') return
    if (!localStorage.getItem('nxt-g')) {
      start()
    }
  }, [start, phase])

  return (
    <div id="dk-wrap">
      <nav id="dk" aria-label={t().dock.label}>
        <DockItem id="a" label={t().nav.about} icon={<Info     size={24} strokeWidth={1.8} color="white" />} colorClass="ic-a" />
        <DockItem id="t" label={t().nav.team} icon={<Users    size={24} strokeWidth={1.8} color="white" />} colorClass="ic-t" />
        <DockItem id="s" label={t().nav.services} icon={<Code2    size={24} strokeWidth={1.8} color="white" />} colorClass="ic-s" />
        <DockItem id="c" label={t().nav.contact} icon={<Mail     size={24} strokeWidth={1.8} color="white" />} colorClass="ic-c" />

        <div className="dk-sep" />

        <div
          className="di"
          onClick={start}
          tabIndex={0}
          role="button"
          aria-label={t().dock.guideLabel}
          onKeyDown={(e) => e.key === 'Enter' && start()}
        >
          <div className="di-i ic-h">
            <HelpCircle size={24} strokeWidth={1.8} color="white" />
          </div>
          <div className="tip">{t().dock.guide}</div>
          <div className="dot" />
        </div>
      </nav>
    </div>
  )
}
