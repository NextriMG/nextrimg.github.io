import { useTheme } from 'next-themes'
import { useClock } from '../../hooks/useClock'
import { useDesktopStore } from '../../store/desktop'
import type { WindowId } from '../../types'

export default function Menubar() {
  const { theme, setTheme } = useTheme()
  const time = useClock()
  const { openWindows, reducedWindows, focusedWindow, openWindow, focusWindow, restoreWindow } = useDesktopStore()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const getLinkClass = (id: WindowId) => {
    if (!openWindows.includes(id)) return 'mb-lnk'
    if (reducedWindows.includes(id)) return 'mb-lnk mb-lnk--reduced'
    if (focusedWindow === id) return 'mb-lnk mb-lnk--focused'
    return 'mb-lnk mb-lnk--open'
  }

  const handleLinkClick = (id: WindowId) => {
    if (!openWindows.includes(id)) {
      openWindow(id)
    } else if (reducedWindows.includes(id)) {
      restoreWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <nav id="mb" aria-label="Menu principal">
      <div className="mb-l">
        <div className="mb-logo">NEXTRI</div>
        <span className={getLinkClass('a')} onClick={() => handleLinkClick('a')} tabIndex={0}>
          À propos
        </span>
        <span className={getLinkClass('t')} onClick={() => handleLinkClick('t')} tabIndex={0}>
          {"L'équipe"}
        </span>
        <span className={getLinkClass('s')} onClick={() => handleLinkClick('s')} tabIndex={0}>
          Services
        </span>
        <span className={getLinkClass('c')} onClick={() => handleLinkClick('c')} tabIndex={0}>
          Contact
        </span>
      </div>
      <div className="mb-r">
        <div id="mb-clk">{time}</div>
        <button
          id="th-btn"
          onClick={toggleTheme}
          aria-label="Basculer thème sombre/clair"
        />
      </div>
    </nav>
  )
}
