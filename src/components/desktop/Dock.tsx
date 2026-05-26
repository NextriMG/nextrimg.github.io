import { useEffect } from 'react'
import { Info, Users, Code2, Mail, HelpCircle } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'
import { useGuide } from '../../hooks/useGuide'
import type { WindowId } from '../../types'

interface DockItemProps {
  id: WindowId
  label: string
  icon: React.ReactNode
  colorClass: string
}

function DockItem({ id, label, icon, colorClass }: DockItemProps) {
  const { openWindows, openWindow } = useDesktopStore()
  const isOpen = openWindows.includes(id)

  return (
    <div
      className={`di${isOpen ? ' open' : ''}`}
      id={`di-${id}`}
      onClick={() => openWindow(id)}
      tabIndex={0}
      role="button"
      aria-label={label}
      onKeyDown={(e) => e.key === 'Enter' && openWindow(id)}
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
      const id = setTimeout(start, 2100)
      return () => clearTimeout(id)
    }
  }, [start, phase])

  return (
    <div id="dk-wrap">
      <nav id="dk" aria-label="Navigation principale">
        <DockItem id="a" label="À propos" icon={<Info     size={24} strokeWidth={1.8} color="white" />} colorClass="ic-a" />
        <DockItem id="t" label="L'équipe" icon={<Users    size={24} strokeWidth={1.8} color="white" />} colorClass="ic-t" />
        <DockItem id="s" label="Services" icon={<Code2    size={24} strokeWidth={1.8} color="white" />} colorClass="ic-s" />
        <DockItem id="c" label="Contact"  icon={<Mail     size={24} strokeWidth={1.8} color="white" />} colorClass="ic-c" />

        <div className="dk-sep" />

        <div
          className="di"
          onClick={start}
          tabIndex={0}
          role="button"
          aria-label="Guide d'utilisation"
          onKeyDown={(e) => e.key === 'Enter' && start()}
        >
          <div className="di-i ic-h">
            <HelpCircle size={24} strokeWidth={1.8} color="white" />
          </div>
          <div className="tip">Guide</div>
          <div className="dot" />
        </div>
      </nav>
    </div>
  )
}
