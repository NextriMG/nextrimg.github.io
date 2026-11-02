import { Zap, Target } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'
import { t } from '../../i18n'

export default function AboutWindow() {
  const openWindow = useDesktopStore((s) => s.openWindow)

  return (
    <>
      <h3 className="sec-h">{t().about.title}</h3>
      <p className="sec-p">
        {t().about.intro}
      </p>
      <h4 className="sec-h2">{t().about.modesTitle}</h4>
      <div className="modes-g">
        <div className="mc">
          <div className="mc-ico mc-ico-tl"><Zap size={18} strokeWidth={2} /></div>
          <div>
            <h5>{t().about.collectiveTitle}</h5>
            <p>
              {t().about.collectiveText}
            </p>
          </div>
        </div>
        <div className="mc">
          <div className="mc-ico mc-ico-or"><Target size={18} strokeWidth={2} /></div>
          <div>
            <h5>{t().about.expertTitle}</h5>
            <p>
              {t().about.expertText}
            </p>
          </div>
        </div>
      </div>
      <h4 className="sec-h2" style={{ marginTop: '18px' }}>{t().about.commitmentTitle}</h4>
      <p className="sec-p">
        {t().about.commitmentText}
      </p>
      <button className="btn btn-p" onClick={() => openWindow('t')} style={{ marginTop: '4px' }}>
        {t().about.cta}
      </button>
    </>
  )
}
