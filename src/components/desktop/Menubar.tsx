import { useTheme } from 'next-themes'
import { useClock } from '../../hooks/useClock'
import { useDesktopStore } from '../../store/desktop'
import type { WindowId } from '../../types'
import { t } from '../../i18n'

export default function Menubar() {
  const { theme, resolvedTheme, setTheme } = useTheme()
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
    <nav id="mb" aria-label={t().menubar.label}>
      <div className="mb-l">
        <img
          className="mb-logo"
          src={`${import.meta.env.BASE_URL}logo/wordmark-${resolvedTheme === 'light' ? 'encre' : 'papier'}.svg`}
          alt="NEXTRI"
        />
        <span className={getLinkClass('a')} onClick={() => handleLinkClick('a')} tabIndex={0}>
          {t().nav.about}
        </span>
        <span className={getLinkClass('t')} onClick={() => handleLinkClick('t')} tabIndex={0}>
          {t().nav.team}
        </span>
        <span className={getLinkClass('s')} onClick={() => handleLinkClick('s')} tabIndex={0}>
          {t().nav.services}
        </span>
        <span className={getLinkClass('c')} onClick={() => handleLinkClick('c')} tabIndex={0}>
          {t().nav.contact}
        </span>
      </div>
      <div className="mb-r">
        <a
          className="mb-lang"
          href={`${import.meta.env.BASE_URL}${t().lang.switchHref}`}
          hrefLang={t().lang.switchLang}
          lang={t().lang.switchLang}
          aria-label={t().lang.switchLabel}
          onClick={() => localStorage.setItem('nxt-lang', t().lang.switchLang)}
        >
          {t().lang.switchTo}
        </a>
        <div id="mb-clk">{time}</div>
        <button
          id="th-btn"
          onClick={toggleTheme}
          aria-label={t().menubar.themeToggle}
        />
      </div>
    </nav>
  )
}
