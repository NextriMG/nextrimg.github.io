import { LayoutDashboard, Database, Monitor, Upload } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'

export default function ServicesWindow() {
  const openWindow = useDesktopStore((s) => s.openWindow)

  return (
    <>
      <p className="sec-p">
        De la conception à la production, nous couvrons l'ensemble du cycle de vie de votre
        projet digital.
      </p>
      <div className="sv-g">
        <div className="sv-c" data-c="tl">
          <div className="sv-ico">
            <LayoutDashboard size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>Développement web sur mesure</h3>
            <p>
              Plateformes métiers, SaaS, tableaux de bord, outils internes et portails clients
              adaptés à vos besoins réels.
            </p>
          </div>
        </div>

        <div className="sv-c" data-c="or">
          <div className="sv-ico">
            <Database size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>Backend &amp; Architecture</h3>
            <p>
              APIs robustes, architectures scalables conçues pour supporter la croissance et
              l'évolution fonctionnelle.
            </p>
          </div>
        </div>

        <div className="sv-c" data-c="lv">
          <div className="sv-ico">
            <Monitor size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>Infrastructure &amp; Data</h3>
            <p>
              Environnements fiables, déploiements automatisés, modélisation de bases de données,
              traitement des données.
            </p>
          </div>
        </div>

        <div className="sv-c" data-c="yw">
          <div className="sv-ico">
            <Upload size={18} strokeWidth={2} />
          </div>
          <div>
            <h3>Audit &amp; Conseil</h3>
            <p>
              Analyse de l'existant, refactoring, optimisation des performances et accompagnement
              stratégique technique.
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
          Vous avez un projet en tête ? Parlons-en.
        </p>
        <button className="btn btn-p" onClick={() => openWindow('c')}>
          Démarrer un projet →
        </button>
      </div>
    </>
  )
}
