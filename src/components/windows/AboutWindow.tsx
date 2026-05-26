import { Zap, Target } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'

export default function AboutWindow() {
  const openWindow = useDesktopStore((s) => s.openWindow)

  return (
    <>
      <h2 className="sec-h">Trois experts. Une équipe. Votre livrable.</h2>
      <p className="sec-p">
        NEXTRI est un collectif de trois ingénieurs logiciels basé à Antananarivo. Nous accompagnons
        entreprises, startups et porteurs de projets dans la conception, le développement et
        l'évolution de produits digitaux fiables.
      </p>
      <h3 className="sec-h2">Deux façons de travailler ensemble</h3>
      <div className="modes-g">
        <div className="mc">
          <div className="mc-ico mc-ico-tl"><Zap size={18} strokeWidth={2} /></div>
          <div>
            <h4>Mode Collectif</h4>
            <p>
              Projets complets — SaaS, plateformes web, systèmes complexes. Architecture + Backend +
              Frontend + DevOps en équipe unifiée, responsabilité partagée du livrable.
            </p>
          </div>
        </div>
        <div className="mc">
          <div className="mc-ico mc-ico-or"><Target size={18} strokeWidth={2} /></div>
          <div>
            <h4>Mode Expert</h4>
            <p>
              Chaque membre intervient de façon autonome sur un besoin précis. La souplesse d'un
              freelance, avec la fiabilité d'un collectif derrière le profil engagé.
            </p>
          </div>
        </div>
      </div>
      <h3 className="sec-h2" style={{ marginTop: '18px' }}>Notre engagement</h3>
      <p className="sec-p">
        Transparence dans les choix techniques, code maintenable sans dette cachée, réponse garantie
        sous 24h. Des solutions pensées pour durer.
      </p>
      <button className="btn btn-p" onClick={() => openWindow('t')} style={{ marginTop: '4px' }}>
        {"Rencontrer l'équipe →"}
      </button>
    </>
  )
}
