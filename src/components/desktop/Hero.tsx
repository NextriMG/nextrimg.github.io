import { useDesktopStore } from '../../store/desktop'
import { t } from '../../i18n'

export default function Hero() {
  const openWindow = useDesktopStore((s) => s.openWindow)

  return (
    <div id="hero" aria-label={t().hero.label}>
      <h1>
        {t().hero.title1}<br />
        <b>{t().hero.title2}</b>
      </h1>
      <p>{t().hero.lead}</p>
      <div className="h-ctas">
        <button className="btn btn-p" onClick={() => openWindow('s')}>
          {t().hero.services}
        </button>
        <button className="btn btn-g" onClick={() => openWindow('t')}>
          {t().hero.team}
        </button>
      </div>
    </div>
  )
}
