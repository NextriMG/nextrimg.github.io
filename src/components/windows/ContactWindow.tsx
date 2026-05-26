import { useState, useRef } from 'react'

export default function ContactWindow() {
  const [sent, setSent] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const name = nameRef.current!.value.trim()
    const email = emailRef.current!.value.trim()
    if (!name) { nameRef.current!.style.borderColor = 'var(--or)'; nameRef.current!.focus(); return }
    if (!email) { emailRef.current!.style.borderColor = 'var(--or)'; emailRef.current!.focus(); return }
    setSent(true)
  }

  if (sent) {
    return (
      <div id="c-ok" style={{ display: 'block' }}>
        <div className="ico">✉️</div>
        <h3>Message bien reçu !</h3>
        <p>
          Nous vous répondrons dans les 24 heures.<br />
          Pour toute urgence :{' '}
          <a href="mailto:nextri.mg@outlook.com">nextri.mg@outlook.com</a>
        </p>
      </div>
    )
  }

  return (
    <div id="c-form">
      <p className="sec-p" style={{ marginBottom: '16px' }}>
        Réponse garantie sous 24h. Décrivez-nous votre projet.
      </p>
      <div className="cf">
        <div className="fg">
          <label htmlFor="cf-n">Votre nom</label>
          <input
            ref={nameRef}
            type="text"
            id="cf-n"
            placeholder="Jean Dupont"
            autoComplete="name"
          />
        </div>
        <div className="fg">
          <label htmlFor="cf-e">Adresse email</label>
          <input
            ref={emailRef}
            type="email"
            id="cf-e"
            placeholder="jean@startup.com"
            autoComplete="email"
          />
        </div>
        <div className="fg">
          <label htmlFor="cf-t">{"Type d'intervention"}</label>
          <select id="cf-t">
            <option value="">Sélectionner...</option>
            <option>Développement produit complet</option>
            <option>Mission backend / API</option>
            <option>Mission frontend</option>
            <option>Infrastructure / DevOps</option>
            <option>Audit technique</option>
            <option>Autre</option>
          </select>
        </div>
        <div className="fg">
          <label htmlFor="cf-m">Décrivez votre besoin</label>
          <textarea
            id="cf-m"
            placeholder="Nous construisons une plateforme SaaS et avons besoin..."
          />
        </div>
        <button className="btn btn-p" onClick={handleSubmit}>Envoyer →</button>
      </div>
    </div>
  )
}
