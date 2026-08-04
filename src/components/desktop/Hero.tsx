import { useDesktopStore } from '../../store/desktop'

export default function Hero() {
  const openWindow = useDesktopStore((s) => s.openWindow)

  return (
    <div id="hero" aria-label="Message principal">
      <h1>
        Co-construire vos<br />
        <b>ambitions digitales.</b>
      </h1>
      <p>Un collectif de trois ingénieurs : une équipe ou un expert, selon vos besoins.</p>
      <div className="h-ctas">
        <button className="btn btn-p" onClick={() => openWindow('s')}>
          Voir nos services
        </button>
        <button className="btn btn-g" onClick={() => openWindow('t')}>
          {"Rencontrer l'équipe"}
        </button>
      </div>
    </div>
  )
}
