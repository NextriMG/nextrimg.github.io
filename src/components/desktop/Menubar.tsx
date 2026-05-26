import { useTheme } from 'next-themes'
import { useClock } from '../../hooks/useClock'
import { useDesktopStore } from '../../store/desktop'

export default function Menubar() {
  const { theme, setTheme } = useTheme()
  const time = useClock()
  const openWindow = useDesktopStore((s) => s.openWindow)

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <nav id="mb" aria-label="Menu principal">
      <div className="mb-l">
        <div className="mb-logo">NEXTRI</div>
        <span className="mb-lnk" onClick={() => openWindow('a')} tabIndex={0}>
          À propos
        </span>
        <span className="mb-lnk" onClick={() => openWindow('t')} tabIndex={0}>
          {"L'équipe"}
        </span>
        <span className="mb-lnk" onClick={() => openWindow('s')} tabIndex={0}>
          Services
        </span>
        <span className="mb-lnk" onClick={() => openWindow('c')} tabIndex={0}>
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
