import { LayoutDashboard, Database, Monitor, Upload } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'
import { t } from '../../i18n'

export default function ServicesWindow() {
  const openWindow = useDesktopStore((s) => s.openWindow)

  return (
    <>
      <p className="sec-p">
        {t().services.intro}
      </p>
      <div className="sv-g">
        <div className="sv-c" data-c="tl">
          <div className="sv-ico">
            <LayoutDashboard size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>{t().services.webTitle}</h3>
            <p>
              {t().services.webText}
            </p>
          </div>
        </div>

        <div className="sv-c" data-c="or">
          <div className="sv-ico">
            <Database size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>{t().services.backendTitle}</h3>
            <p>
              {t().services.backendText}
            </p>
          </div>
        </div>

        <div className="sv-c" data-c="lv">
          <div className="sv-ico">
            <Monitor size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>{t().services.infraTitle}</h3>
            <p>
              {t().services.infraText}
            </p>
          </div>
        </div>

        <div className="sv-c" data-c="yw">
          <div className="sv-ico">
            <Upload size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>{t().services.auditTitle}</h3>
            <p>
              {t().services.auditText}
            </p>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: 'var(--bg)',
        borderRadius: '10px',
        border: '1px solid var(--bd)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <p style={{ fontSize: '13px', color: 'var(--tx2)' }}>
          {t().services.ctaText}
        </p>
        <button className="btn btn-p" onClick={() => openWindow('c')}>
          {t().services.cta}
        </button>
      </div>
    </>
  )
}
