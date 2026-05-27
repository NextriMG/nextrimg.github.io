import { useState, useEffect, useRef } from 'react'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_KEY as string | undefined
const CD_KEY = 'nxt-c-cd'
const MIN_TIME_MS = 3_000

export default function ContactWindow() {
  // Read at render time so vi.stubEnv works in tests
  return import.meta.env.VITE_CONTACT_ENABLED === 'true'
    ? <ContactForm />
    : <ContactFallback />
}

// ── Disabled mode — keeps original behavior ───────────────────────────────────
function ContactFallback() {
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

  if (sent) return <SuccessScreen />

  return (
    <div id="c-form">
      <p className="sec-p" style={{ marginBottom: '16px' }}>
        Réponse garantie sous 24h. Décrivez-nous votre projet.
      </p>
      <div className="cf">
        <div className="fg">
          <label htmlFor="cf-n">Votre nom</label>
          <input ref={nameRef} type="text" id="cf-n" placeholder="Jean Dupont" autoComplete="name" />
        </div>
        <div className="fg">
          <label htmlFor="cf-e">Adresse email</label>
          <input ref={emailRef} type="email" id="cf-e" placeholder="jean@startup.com" autoComplete="email" />
        </div>
        <div className="fg">
          <label htmlFor="cf-t">{"Type d'intervention"}</label>
          <select id="cf-t">
            <option value="">Sélectionner...</option>
            <option>Développement produit complet</option>
            <option>Mission backend / API</option>
            <option>Mission frontend</option>
            <option>Infrastructure / Data</option>
            <option>Audit technique</option>
            <option>Autre</option>
          </select>
        </div>
        <div className="fg">
          <label htmlFor="cf-m">Décrivez votre besoin</label>
          <textarea id="cf-m" placeholder="Nous construisons une plateforme SaaS et avons besoin..." />
        </div>
        <button className="btn btn-p" onClick={handleSubmit}>Envoyer →</button>
      </div>
    </div>
  )
}

// ── Enabled mode ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [type, setType]       = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError]       = useState<string | null>(null)
  const [sent, setSent]                 = useState(false)
  const [cooldown, setCooldown]         = useState(0)

  const mountTime      = useRef(Date.now())
  const widgetId       = useRef<string | null>(null)
  const turnstileFailed = useRef(false)
  // Holds the FormData built at submit time while we wait for Turnstile's callback
  const pendingData = useRef<FormData | null>(null)

  // Always-fresh ref so the stable Turnstile callback can reach the latest doSubmit
  const doSubmitRef = useRef<((fd: FormData) => Promise<void>) | null>(null)

  const doSubmit = async (fd: FormData) => {
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json() as { success: boolean }
      if (data.success) {
        setSent(true)
        localStorage.setItem(CD_KEY, String(Date.now() + 60_000))
      } else {
        setFormError("Une erreur est survenue. Réessayez dans un moment.")
      }
    } catch {
      setFormError("Impossible d'envoyer le message. Vérifiez votre connexion.")
    } finally {
      setIsSubmitting(false)
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
    }
  }
  doSubmitRef.current = doSubmit

  // Restore cooldown from localStorage on mount
  useEffect(() => {
    const expires = Number(localStorage.getItem(CD_KEY) ?? 0)
    if (expires > Date.now()) {
      setCooldown(Math.ceil((expires - Date.now()) / 1000))
    }
  }, [])

  // Tick cooldown down once per second
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => {
      const remaining = Math.ceil((Number(localStorage.getItem(CD_KEY) ?? 0) - Date.now()) / 1000)
      if (remaining <= 0) { setCooldown(0); clearInterval(id) }
      else setCooldown(remaining)
    }, 1000)
    return () => clearInterval(id)
  }, [cooldown])

  // Turnstile: render once on mount with explicit execution mode.
  // The widget stays dormant until execute() is called at submit time.
  useEffect(() => {
    if (!TURNSTILE_KEY) {
      console.warn('[Contact] VITE_TURNSTILE_KEY not set — Turnstile skipped')
      return
    }
    const tryRender = () => {
      if (!window.turnstile || widgetId.current) return
      widgetId.current = window.turnstile.render('#cf-turnstile', {
        sitekey: TURNSTILE_KEY,
        size: 'invisible',
        execution: 'execute',
        callback: (_token: string) => {
          const fd = pendingData.current
          if (!fd) return
          pendingData.current = null
          // Token not forwarded — Web3Forms Turnstile verification is a Pro feature.
          // Turnstile still acts as a client-side bot gate; the token itself is discarded.
          void doSubmitRef.current!(fd)
        },
        'error-callback': () => {
          turnstileFailed.current = true
          const fd = pendingData.current
          pendingData.current = null
          if (fd) {
            // Turnstile failed mid-submit — send directly without token
            void doSubmitRef.current!(fd)
          } else {
            // Turnstile failed at init — flag is set; next submit will bypass it silently
            setIsSubmitting(false)
          }
        },
        'expired-callback': () => {
          pendingData.current = null
          setIsSubmitting(false)
          setFormError("Session de vérification expirée. Veuillez réessayer.")
        },
      })
    }
    tryRender()
    let poll: ReturnType<typeof setInterval> | undefined
    if (!window.turnstile) {
      poll = setInterval(() => {
        if (window.turnstile) { tryRender(); clearInterval(poll) }
      }, 200)
    }
    return () => {
      if (poll !== undefined) clearInterval(poll)
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [])

  const clearError = (field: string) =>
    setErrors((prev) => ({ ...prev, [field]: '' }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Requis'
    if (!email.trim()) e.email = 'Requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    if (Date.now() - mountTime.current < MIN_TIME_MS) return // too fast = likely bot

    setFormError(null)
    setIsSubmitting(true)

    const fd = new FormData()
    fd.append('access_key', WEB3FORMS_KEY ?? '')
    fd.append('subject', 'New portfolio contact')
    fd.append('name', name.trim())
    fd.append('email', email.trim())
    fd.append('message', message)
    if (type) fd.append('type_intervention', type)

    if (TURNSTILE_KEY && window.turnstile && widgetId.current && !turnstileFailed.current) {
      // Store form data and trigger challenge — actual submission happens in callback
      pendingData.current = fd
      window.turnstile.execute(widgetId.current)
    } else {
      // Turnstile not configured, not loaded, or previously failed — submit directly
      await doSubmit(fd)
    }
  }

  if (sent) return <SuccessScreen />

  const submitLocked = isSubmitting || cooldown > 0
  const submitLabel  = isSubmitting
    ? 'Envoi…'
    : cooldown > 0
      ? `Réessayer dans ${cooldown}s`
      : 'Envoyer →'

  return (
    <div id="c-form">
      <p className="sec-p" style={{ marginBottom: '16px' }}>
        Réponse garantie sous 24h. Décrivez-nous votre projet.
      </p>
      <div className="cf">
        {/* Honeypot — must remain empty */}
        <input type="text" name="_honey" className="cf-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className={`fg${errors.name ? ' fg-err' : ''}`}>
          <label htmlFor="cf-n">Votre nom</label>
          <input
            type="text" id="cf-n" placeholder="Jean Dupont" autoComplete="name"
            value={name}
            onChange={(e) => { setName(e.target.value); clearError('name') }}
          />
          {errors.name && <span className="fg-msg">{errors.name}</span>}
        </div>

        <div className={`fg${errors.email ? ' fg-err' : ''}`}>
          <label htmlFor="cf-e">Adresse email</label>
          <input
            type="email" id="cf-e" placeholder="jean@startup.com" autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError('email') }}
          />
          {errors.email && <span className="fg-msg">{errors.email}</span>}
        </div>

        <div className="fg">
          <label htmlFor="cf-t">{"Type d'intervention"}</label>
          <select id="cf-t" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Sélectionner...</option>
            <option>Développement produit complet</option>
            <option>Mission backend / API</option>
            <option>Mission frontend</option>
            <option>Infrastructure / Data</option>
            <option>Audit technique</option>
            <option>Autre</option>
          </select>
        </div>

        <div className="fg">
          <label htmlFor="cf-m">Décrivez votre besoin</label>
          <textarea
            id="cf-m" placeholder="Nous construisons une plateforme SaaS et avons besoin..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Invisible Turnstile widget — challenge triggered programmatically on submit */}
        <div id="cf-turnstile" style={{ height: 0, overflow: 'hidden' }} />

        <div className="cf-footer">
          <button
            className="btn btn-p"
            onClick={handleSubmit}
            disabled={submitLocked}
          >
            {submitLabel}
          </button>
          {formError && <p className="cf-error">{formError}</p>}
          <p className="cf-privacy">
            Vos informations ne sont utilisées que pour répondre à votre message et ne sont jamais partagées.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Shared success screen ─────────────────────────────────────────────────────
function SuccessScreen() {
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
