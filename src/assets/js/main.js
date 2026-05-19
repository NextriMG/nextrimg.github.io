(function initMesh() {
    const c = document.getElementById('mesh-canvas')
    if (!c) return
    const ctx = c.getContext('2d')
    const pts = []
    let W, H


    function resize() {
        W = c.width = window.innerWidth
        H = c.height = window.innerHeight
    }


    resize()
    window.addEventListener('resize', resize)
    const blobs = [{x: 0.15, y: 0.3, r: 0.5, hue: 255, speed: 0.0003, phase: 0}, {
        x: 0.8,
        y: 0.7,
        r: 0.4,
        hue: 15,
        speed: 0.0004,
        phase: Math.PI
    }, {x: 0.5, y: 0.1, r: 0.35, hue: 200, speed: 0.00025, phase: 1}]
    let t = 0


    function draw() {
        t += 0.5
        ctx.clearRect(0, 0, W, H)
        blobs.forEach(b => {
            const ox = Math.sin(t * b.speed * 1000 + b.phase) * 0.08
            const oy = Math.cos(t * b.speed * 1000 + b.phase * 1.3) * 0.06
            const cx = (b.x + ox) * W
            const cy = (b.y + oy) * H
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r * Math.min(W, H))
            if (b.hue === 255) {
                grad.addColorStop(0, 'rgba(123,110,255,0.06)')
                grad.addColorStop(1, 'rgba(123,110,255,0)')
            } else if (b.hue === 15) {
                grad.addColorStop(0, 'rgba(255,122,92,0.04)')
                grad.addColorStop(1, 'rgba(255,122,92,0)')
            } else {
                grad.addColorStop(0, 'rgba(61,214,140,0.03)')
                grad.addColorStop(1, 'rgba(61,214,140,0)')
            }
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, W, H)
        })
        requestAnimationFrame(draw)
    }


    draw()
})()
const BRAND = 'Nextri'
const DOMAIN = 'nextri.dev'
const APP_CFG = {
    terminal: {title: 'Terminal', icon: '⌨️', w: 560, h: 360, x: 100, y: 60},
    about: {title: `Équipe — ${BRAND}`, icon: '👥', w: 560, h: 560, x: 130, y: 55},
    projects: {title: `Projets — ${BRAND}`, icon: '🗂️', w: 560, h: 500, x: 155, y: 50},
    stack: {title: 'Stack Technique', icon: '⚡', w: 460, h: 460, x: 170, y: 75},
    contact: {title: `Contact — ${BRAND}`, icon: '✉️', w: 440, h: 540, x: 145, y: 55},
    readme: {title: 'README', icon: '📄', w: 420, h: 380, x: 185, y: 90},
    'member-lionel': {title: 'Lionel Ratovo', icon: '👤', w: 540, h: 580, x: 200, y: 70},
    'member-itokiana': {title: 'Itokiana Rajohnson', icon: '👤', w: 540, h: 580, x: 220, y: 80},
    'member-sitraka': {title: 'Sitraka Rasatarivony', icon: '👤', w: 540, h: 600, x: 240, y: 90}
}
const WM = {
    z: 100, focused: null, state: {}, open(id) {
        if (this.state[id]) {
            const w = document.getElementById('w-' + id)
            if (w && w.classList.contains('is-min')) {
                w.classList.remove('is-min')
                this.state[id].mn = false
                navUpdate(id, false)
            }
            return this.focus(id)
        }
        const cfg = APP_CFG[id]
        if (!cfg) return
        const mobile = window.innerWidth < 768
        const cont = document.getElementById('win-container')
        const win = document.createElement('div')
        win.className = 'win' + (mobile ? ' mobile-fs' : '')
        win.id = 'w-' + id
        if (!mobile) {
            const l = Math.min(cfg.x, window.innerWidth - cfg.w - 20)
            const tp = Math.min(cfg.y + 44, window.innerHeight - cfg.h - 60)
            win.style.cssText = `width:${cfg.w}px;height:${cfg.h}px;left:${l}px;top:${tp}px;`
        }
        const tb = document.createElement('div')
        tb.className = 'win-tb'
        tb.id = 'wtb-' + id
        tb.innerHTML = `<div class="win-btns"><button class="wb cl"></button><button class="wb mn"></button><button class="wb mx"></button></div><div class="win-title">${cfg.title}</div>`
        tb.querySelector('.cl').onclick = () => this.close(id)
        tb.querySelector('.mn').onclick = () => this.minimize(id)
        tb.querySelector('.mx').onclick = () => this.toggleMax(id)
        win.appendChild(tb)
        const body = document.createElement('div')
        body.className = 'win-body'
        const tpl = document.getElementById('tpl-' + id)
        if (tpl) body.appendChild(tpl.content.cloneNode(true))
        win.appendChild(body)
        if (!mobile) {
            const rs = document.createElement('div')
            rs.className = 'win-rs'
            win.appendChild(rs)
            this._initResize(id, win, rs)
        }
        cont.appendChild(win)
        this.state[id] = {mx: false, mn: false, prev: null}
        this.focus(id)
        this._initDrag(id, tb, win)
        navAdd(id, cfg)
        dockSetActive(id, true)
        if (id === 'terminal') setTimeout(() => initTerm(body), 40)
    }, close(id) {
        const w = document.getElementById('w-' + id)
        if (!w) return
        w.style.transition = 'opacity .15s, transform .15s'
        w.style.opacity = '0'
        w.style.transform = 'scale(.92) translateY(6px)'
        setTimeout(() => {
            w.remove()
            delete this.state[id]
            navRemove(id)
            dockSetActive(id, false)
            if (this.focused === id) this.focused = null
        }, 160)
    }, minimize(id) {
        const w = document.getElementById('w-' + id)
        if (!w) return
        const mn = !this.state[id]?.mn
        mn ? w.classList.add('is-min') : w.classList.remove('is-min')
        this.state[id].mn = mn
        navUpdate(id, mn)
        if (!mn) this.focus(id)
    }, toggleMax(id) {
        const w = document.getElementById('w-' + id)
        if (!w) return
        const s = this.state[id]
        if (s.mx) {
            w.classList.remove('is-max')
            const p = s.prev
            w.style.left = p.l
            w.style.top = p.t
            w.style.width = p.w
            w.style.height = p.h
            s.mx = false
        } else {
            s.prev = {l: w.style.left, t: w.style.top, w: w.style.width, h: w.style.height}
            w.classList.add('is-max')
            s.mx = true
        }
    }, focus(id) {
        if (this.focused === id) return
        const pe = document.getElementById('w-' + this.focused)
        if (pe) pe.classList.remove('focused')
        const pb = document.querySelector(`.nav-btn[data-id="${this.focused}"]`)
        if (pb) pb.classList.remove('on')
        this.focused = id
        const w = document.getElementById('w-' + id)
        if (!w) return
        w.classList.add('focused')
        w.style.zIndex = ++this.z
        const b = document.querySelector(`.nav-btn[data-id="${id}"]`)
        if (b) b.classList.add('on')
    }, _initDrag(id, tb, win) {
        let dx, dy, ox, oy, dragging = false
        tb.addEventListener('pointerdown', e => {
            if (e.target.classList.contains('wb')) return
            if (this.state[id]?.mx) return
            dragging = true
            const r = win.getBoundingClientRect()
            dx = e.clientX
            dy = e.clientY
            ox = r.left
            oy = r.top
            tb.setPointerCapture(e.pointerId)
            this.focus(id)
        })
        tb.addEventListener('pointermove', e => {
            if (!dragging) return
            win.style.left = Math.max(0, Math.min(ox + (e.clientX - dx), window.innerWidth - 50)) + 'px'
            win.style.top = Math.max(44, Math.min(oy + (e.clientY - dy), window.innerHeight - 60)) + 'px'
        })
        tb.addEventListener('pointerup', () => dragging = false)
        win.addEventListener('pointerdown', () => this.focus(id))
    }, _initResize(id, win, rs) {
        let dx, dy, ow, oh, resizing = false
        rs.addEventListener('pointerdown', e => {
            resizing = true
            dx = e.clientX
            dy = e.clientY
            const r = win.getBoundingClientRect()
            ow = r.width
            oh = r.height
            rs.setPointerCapture(e.pointerId)
            e.stopPropagation()
        })
        rs.addEventListener('pointermove', e => {
            if (!resizing) return
            win.style.width = Math.max(280, ow + (e.clientX - dx)) + 'px'
            win.style.height = Math.max(180, oh + (e.clientY - dy)) + 'px'
        })
        rs.addEventListener('pointerup', () => resizing = false)
    }, openAll() {
        Object.keys(APP_CFG).forEach((id, i) => setTimeout(() => this.open(id), 110 * i))
    }, closeAll() {
        [...Object.keys(this.state)].forEach(id => this.close(id))
    }
}


function navAdd(id, cfg) {
    const apps = document.getElementById('nav-apps')
    const btn = document.createElement('button')
    btn.className = 'nav-btn on'
    btn.dataset.id = id
    btn.innerHTML = `<span class="nav-dot"></span>${cfg.title.split('—')[0].trim().split(' ')[0]}`
    btn.onclick = () => WM.minimize(id)
    apps.appendChild(btn)
    document.querySelectorAll('.nav-btn').forEach(b => {
        if (b.dataset.id !== id) b.classList.remove('on')
    })
}


function navRemove(id) {
    document.querySelector(`.nav-btn[data-id="${id}"]`)?.remove()
}


function navUpdate(id, mn) {
    const b = document.querySelector(`.nav-btn[data-id="${id}"]`)
    if (b) mn ? b.classList.add('mn') : b.classList.remove('mn')
}


function dockSetActive(id, active) {
    const item = document.querySelector(`.dock-item[data-app="${id}"]`)
    if (item) item.classList.toggle('active', active)
}


function tickClock() {
    const el = document.getElementById('nav-clock')
    if (el) el.textContent = new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})
}


tickClock()
setInterval(tickClock, 10000)


function showNotif(title, body) {
    document.getElementById('notif-title').textContent = title
    document.getElementById('notif-body').textContent = body
    const n = document.getElementById('notif')
    n.classList.add('show')
    setTimeout(() => n.classList.remove('show'), 4500)
}


function initOnboarding() {
    if (localStorage.getItem('nextri_onboarded')) return
    if (window.innerWidth < 768) return
    const ob = document.getElementById('onboarding')
    const text = document.getElementById('ob-text')
    const dots = document.querySelectorAll('.ob-dot')
    if (!ob || !text) return
    const steps = [
        'Cliquez sur une icône pour ouvrir un panneau',
        'Déplacez les panneaux par leur barre de titre',
        'Retrouvez notre contact ici → icône Contact'
    ]
    let step = 0
    function showStep(n) {
        text.textContent = steps[n]
        dots.forEach((d, i) => d.classList.toggle('active', i === n))
    }
    function dismiss() {
        clearTimeout(dismissTimer)
        ob.style.display = 'none'
        localStorage.setItem('nextri_onboarded', '1')
        ob.removeEventListener('click', advance)
        ob.removeEventListener('keydown', handleKey)
    }
    function advance() {
        step++
        if (step >= steps.length) return dismiss()
        showStep(step)
    }
    function handleKey(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance() }
        if (e.key === 'Escape') dismiss()
    }
    showStep(0)
    ob.style.display = 'flex'
    ob.tabIndex = 0
    ob.setAttribute('role', 'dialog')
    ob.setAttribute('aria-label', 'Guide d\'utilisation')
    ob.addEventListener('click', advance)
    ob.addEventListener('keydown', handleKey)
    const dismissTimer = setTimeout(dismiss, 10000)
}


function hideCtx() {
    document.getElementById('ctx').classList.remove('show')
}


document.addEventListener('contextmenu', e => {
    const allowed = e.target.id === 'desktop' || e.target.id === 'win-container' || e.target.classList.contains('dsk-gfx')
    if (!allowed) return
    e.preventDefault()
    const ctx = document.getElementById('ctx')
    ctx.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px'
    ctx.style.top = Math.min(e.clientY, window.innerHeight - 200) + 'px'
    ctx.classList.add('show')
})
document.addEventListener('click', e => {
    if (!e.target.closest('#ctx')) hideCtx()
})
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideCtx()
})
document.addEventListener('click', e => {
    if (!e.target.closest('.dsk-icon')) document.querySelectorAll('.dsk-icon').forEach(i => i.classList.remove('sel'))
})


function selIcon(el) {
    document.querySelectorAll('.dsk-icon').forEach(i => i.classList.remove('sel'))
    el.classList.add('sel')
}


function toggleMbr(el) {
    el.classList.toggle('open')
}


function toggleProj(el) {
    el.classList.toggle('open')
}


function animSk(el) {
    el.querySelectorAll('.sk-f').forEach(f => {
        f.style.transform = `scaleX(${f.dataset.v || 1})`
    })
}


function submitCF(btn) {
    const form = btn.closest('.cf-form')
    const fields = form.querySelectorAll('input, textarea, select')
    let valid = true
    fields.forEach(f => {
        if (!f.value.trim()) {
            valid = false
            f.style.borderColor = 'var(--red)'
            setTimeout(() => f.style.borderColor = '', 2000)
        }
    })
    if (!valid) return
    btn.textContent = 'Envoi en cours…'
    btn.disabled = true
    setTimeout(() => {
        form.style.transition = 'opacity .3s'
        form.style.opacity = '0'
        setTimeout(() => {
            form.style.display = 'none'
            form.nextElementSibling.style.display = 'block'
            showNotif('Message envoyé !', 'Réponse sous 24h.')
        }, 300)
    }, 1100)
}


function initTerm(container) {
    const out = container.querySelector('.term-out')
    const inp = container.querySelector('.t-inp')
    if (!out || !inp) return
    const hist = []
    let hi = -1


    function ln(html) {
        const d = document.createElement('div')
        d.className = 't-line'
        d.innerHTML = html
        out.appendChild(d)
        out.scrollTop = out.scrollHeight
    }


    ln(`<span class="ca">${BRAND} Terminal</span> · v2.0`)
    ln('<span class="cd">Type \'help\' pour les commandes disponibles.</span>')
    ln('')
    const cmds = {
        help() {
            ln('<span class="ca">Commandes :</span>');
            [['whoami', 'Présentation équipe'], ['neofetch', 'Infos système'], ['ls', 'Apps disponibles'], ['cat about.txt', 'Fiche équipe'], ['cat stack.txt', 'Stack technique'], ['open [app]', 'Ouvrir une fenêtre'], ['contact', 'Ouvrir Contact'], ['date', 'Date & heure'], ['clear', 'Vider le terminal'], ['sudo hire-us', '😏']].forEach(([c, d]) => ln(` <span class="cg">${c.padEnd(18)}</span><span class="cd">${d}</span>`))
            ln('')
        }, whoami() {
            ln(`<span class="ca">${BRAND}</span> — <span class="cw">Équipe fullstack · Master II MBDS · ITUniversity MG</span>`)
            ln('Localité : Antananarivo, Madagascar')
            ln('Stack : Java · Spring Boot · Node.js · NestJS · Angular · React · Python · FastAPI')
            ln('')
        }, neofetch() {
            ln('<span class="cd"> ┌─────────────────────────────────────┐</span>')
            ln(`<span class="cd"> │</span><span class="ca">${BRAND} · Fullstack Engineers  </span><span class="cd">│</span>`)
            ln('<span class="cd"> └─────────────────────────────────────┘</span>')
            ln('')
            ln(`<span class="cg">OS </span> ${BRAND} Portfolio v2.0`)
            ln('<span class="cg">Host </span> ITUniversity Madagascar · Master II MBDS')
            ln('<span class="cg">Kernel </span> TypeScript 5.x · Java 21')
            ln('<span class="cg">Uptime </span> 5+ ans d\'expérience production')
            ln('<span class="cg">CPU </span> 3× Fullstack Developer @ 100%')
            ln('<span class="cg">Memory </span> Spring Boot · Angular · NestJS · Node.js · FastAPI · React')
            ln('<span class="cg">Storage </span> 30+ projets livrés · IGNFI · RAPP IO · Stellar-IX · BICI')
            ln('')
        }, ls() {
            Object.keys(APP_CFG)
                .filter(k => !k.startsWith('member-'))
                .map(k => k === 'readme' ? 'readme.txt' : `${k}.app`)
                .forEach(n => ln(` <span class="cb">${n}</span>`))
            ln('')
        }, 'cat about.txt'() {
            ln(`<span class="ca">## ${BRAND}</span>`)
            ln('Trois ingénieurs fullstack · Master II MBDS · ITUniversity MG')
            ln('<span style="color:#9090FF">Lionel </span>→ Technical Project Lead · Backend & Data · Java · Node.js · Oracle · PostgreSQL')
            ln('<span class="cb">Itokiana</span>→ Full Stack Senior · Chef de projet adjoint · Java · Angular · Ionic · Scrum')
            ln('<span class="cy">Sitraka </span>→ Full Stack · DevOps · DevSecOps · Spring Boot · NestJS · FastAPI · Docker · CI/CD')
            ln('')
        }, 'cat stack.txt'() {
            ln('<span class="ca">## Stack technique</span>');
            [['Java / Spring Boot', '95%', .95], ['Node.js / NestJS', '93%', .93], ['TypeScript / JS', '92%', .92], ['Angular / Ionic', '90%', .9], ['React / Next.js', '88%', .88], ['Python / FastAPI', '85%', .85]].forEach(([t, p, v]) => {
                const b = '█'.repeat(Math.round(10 * v)) + '░'.repeat(10 - Math.round(10 * v))
                ln(` <span class="cw">${t.padEnd(20)}</span><span class="ca">${b}</span><span class="cd">${p}</span>`)
            })
            ln('<span class="cd">DB : PostgreSQL · Oracle · MySQL · MongoDB · ClickHouse · SQL Server</span>')
            ln('<span class="cd">Ops: Docker · CI/CD · Nginx · Linux · Git / GitHub</span>')
            ln('')
        }, contact() {
            WM.open('contact')
            ln('<span class="cg">✓</span> Contact ouvert.')
            ln('')
        }, date() {
            ln(new Date().toLocaleString('fr-FR'))
            ln('')
        }, clear() {
            out.innerHTML = ''
        }, 'sudo hire-us'() {
            ln('<span class="cy">[sudo]</span> Authentification...')
            setTimeout(() => {
                ln('<span class="cg">✓ Permission accordée. Mot de passe : évidence.</span>')
                ln('<span class="ca">Vous venez de prendre la meilleure décision de l\'année.</span>')
                ln('<span class="cd">Lancement de Contact dans 3s...</span>')
                ln('')
                setTimeout(() => WM.open('contact'), 3000)
            }, 1200)
        }
    }
    const appIds = Object.keys(APP_CFG)
    const cmdKeys = Object.keys(cmds)
    inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const val = inp.value.trim()
            if (!val) return
            inp.value = ''
            hist.unshift(val)
            hi = -1
            ln(`<span class="cg">trio</span><span class="cd">@dev:~$</span> <span class="cw">${val}</span>`)
            const cmd = val.toLowerCase()
            if (cmd === 'open' || cmd.startsWith('open ')) {
                const app = cmd.slice(4).trim()
                if (!app) {
                    ln('Usage : <span class="ca">open [app]</span>')
                    ln('Apps  : ' + appIds.filter(k => !k.startsWith('member-')).map(k => `<span class="cg">${k}</span>`).join(' · '))
                } else if (APP_CFG[app]) {
                    WM.open(app)
                    ln(`<span class="cg">✓</span> <span class="cw">${app}</span> ouvert.`)
                } else {
                    ln(`<span class="cr">bash: open: ${app}: introuvable</span>`)
                    ln('Apps : ' + appIds.filter(k => !k.startsWith('member-')).map(k => `<span class="cd">${k}</span>`).join(' · '))
                }
                ln('')
            } else if (cmds[cmd]) {
                cmds[cmd]()
            } else {
                ln(`<span class="cr">bash: ${val}: commande introuvable</span> <span class="cd">(try 'help')</span>`)
                ln('')
            }
        } else if (e.key === 'ArrowUp') {
            if (hist[hi + 1] !== undefined) inp.value = hist[++hi]
        } else if (e.key === 'ArrowDown') {
            hi = Math.max(-1, hi - 1)
            inp.value = hi >= 0 ? hist[hi] : ''
        } else if (e.key === 'Tab') {
            e.preventDefault()
            const cur = inp.value
            const low = cur.toLowerCase()
            if (low.startsWith('open ')) {
                const partial = low.slice(5)
                const matches = appIds.filter(k => k.startsWith(partial))
                if (matches.length === 1) {
                    inp.value = 'open ' + matches[0]
                } else if (matches.length > 1) {
                    ln(`<span class="cg">trio</span><span class="cd">@dev:~$</span> <span class="cw">${cur}</span>`)
                    ln(matches.map(m => `<span class="cg">${m}</span>`).join('  '))
                    ln('')
                }
            } else {
                const matches = cmdKeys.filter(k => k.startsWith(low))
                if (matches.length === 1) {
                    inp.value = matches[0]
                } else if (matches.length > 1) {
                    ln(`<span class="cg">trio</span><span class="cd">@dev:~$</span> <span class="cw">${cur}</span>`)
                    ln(matches.map(m => `<span class="cg">${m}</span>`).join('  '))
                    ln('')
                }
            }
        }
    })
    inp.focus()
}


function enterDesktop() {
    const intro = document.getElementById('intro')
    if (!intro || intro.style.display === 'none') return
    const lock = document.getElementById('lock-screen')
    if (!lock || !lock.classList.contains('ls-visible')) return
    intro.style.transition = 'opacity .7s ease'
    intro.style.opacity = '0'
    setTimeout(() => {
        intro.style.display = 'none'
        document.getElementById('desktop').classList.add('visible')
        document.getElementById('dock').classList.add('visible')
        setTimeout(() => {
            showNotif(BRAND, 'Cliquez sur une icône pour démarrer.')
            initOnboarding()
        }, 650)
    }, 700)
}


document.addEventListener('keydown', e => {
    if (e.key === 'Enter') enterDesktop()
})


function tickLockClock() {
    const now = new Date()
    const cl = document.getElementById('lock-clock')
    const dl = document.getElementById('lock-date')
    if (cl) cl.textContent = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})
    if (dl) dl.textContent = now.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
}

setInterval(tickLockClock, 30000)

// Show lock screen immediately — no boot on normal load
;(function initLockScreen() {
    const boot = document.getElementById('boot-screen')
    const lock = document.getElementById('lock-screen')
    if (boot) boot.style.display = 'none'
    if (lock) { lock.classList.add('ls-visible'); tickLockClock() }
})()

// Boot easter egg — Ctrl+B or Konami code (mobile: disabled)
function triggerBoot() {
    if (window.innerWidth < 768) return
    const intro = document.getElementById('intro')
    if (!intro || intro.style.display === 'none') return
    const boot = document.getElementById('boot-screen')
    if (!boot) return
    boot.style.display = ''
    boot.style.opacity = '1'
    boot.style.transition = ''
    const log = document.getElementById('boot-log')
    log.innerHTML = ''
    let done = false
    function endBoot() {
        if (done) return
        done = true
        boot.style.transition = 'opacity .4s ease'
        boot.style.opacity = '0'
        setTimeout(() => { boot.style.display = 'none'; boot.style.transition = '' }, 420)
    }
    document.addEventListener('click', endBoot, { once: true })
    document.addEventListener('keydown', endBoot, { once: true })
    setTimeout(endBoot, 1500)
    const lines = [
        `<span class="bl-ts">[  0.000000]</span> <span class="bl-hi">${BRAND}</span> portfolio kernel v2.0`,
        `<span class="bl-ts">[  0.038241]</span> Detected 3 Fullstack Developer cores`,
        `<span class="bl-ts">[  0.112873]</span> Loading portfolio modules...`,
        `<span class="bl-ts">[  0.214560]</span> <span class="bl-ok">[  OK  ]</span> Stack · Backend · DevOps loaded`,
        `<span class="bl-ts">[  0.298134]</span> <span class="bl-ok">[  OK  ]</span> Projects database mounted`,
        `<span class="bl-ts">[  0.374021]</span> <span class="bl-ok">[  OK  ]</span> Team profiles ready — Lionel · Itokiana · Sitraka`,
        `<span class="bl-ts">[  0.451893]</span> <span class="bl-ok">[  OK  ]</span> Terminal emulator started`,
        `<span class="bl-ts">[  0.534762]</span> <span class="bl-ok">[  OK  ]</span> Window Manager initialized`,
        `<span class="bl-ts">[  0.653410]</span> Starting ${BRAND} portfolio environment...`,
        `<span class="bl-ts">[  0.821905]</span> <span class="bl-ok">[  OK  ]</span> All systems operational`,
    ]
    const delays = [0, 90, 180, 290, 370, 450, 540, 620, 760, 900]
    lines.forEach((html, i) => setTimeout(() => {
        if (done) return
        const el = document.createElement('div')
        el.className = 'boot-line'
        el.innerHTML = html
        log.appendChild(el)
    }, delays[i]))
}

// Konami: ↑↑↓↓←→←→BA
;(function initEasterEgg() {
    const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    let ki = 0
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'b') { triggerBoot(); return }
        if (e.keyCode === KONAMI[ki]) { ki++; if (ki === KONAMI.length) { ki = 0; triggerBoot() } }
        else ki = 0
    })
})()

;(function initSpace() {
    const canvas = document.getElementById('space-canvas')
    if (!canvas) return
    if (window.innerWidth < 768) {
        initNeonMobile(canvas)
    }
    // Desktop: Three.js orbital replaced by #skill-map (DOM/CSS)
})()

function initNeonMobile(canvas) {
    const ctx = canvas.getContext('2d')
    let W, H
    function resize() { W = canvas.width = canvas.offsetWidth || innerWidth; H = canvas.height = canvas.offsetHeight || innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const nodes = [
        { label: 'NEXTRI', color: '#CC44FF', r: 0,    speed: 0,    phase: 0 },
        { label: 'L',   color: '#3DD68C', r: 0.22, speed: 0.40, phase: 0 },
        { label: 'I',   color: '#5AB8F5', r: 0.30, speed: 0.28, phase: Math.PI * 0.7 },
        { label: 'S',   color: '#7B6EFF', r: 0.38, speed: 0.18, phase: Math.PI * 1.4 },
    ]

    let t = 0
    function drawNeon() {
        t += 0.016
        ctx.clearRect(0, 0, W, H)
        const cx = W / 2, cy = H * 0.56
        const base = Math.min(W, H)

        // Neon "NEXTRI" title
        const titleY = H * 0.20
        const titleFs = Math.round(Math.min(W * 0.17, 68))
        const pulse = 0.78 + Math.sin(t * 1.1) * 0.22
        ctx.save()
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ;[
            { blur: 52, alpha: 0.10 * pulse, fill: '#7B6EFF' },
            { blur: 28, alpha: 0.20 * pulse, fill: '#7B6EFF' },
            { blur: 12, alpha: 0.42 * pulse, fill: '#9D92FF' },
        ].forEach(({ blur, alpha, fill }) => {
            ctx.font = `900 ${titleFs}px 'DM Mono', monospace`
            ctx.globalAlpha = alpha
            ctx.shadowColor = fill
            ctx.shadowBlur = blur
            ctx.fillStyle = fill
            ctx.fillText('NEXTRI', cx, titleY)
        })
        ctx.font = `900 ${titleFs}px 'DM Mono', monospace`
        ctx.globalAlpha = 0.90
        ctx.shadowColor = '#C4BFFF'
        ctx.shadowBlur = 5
        ctx.fillStyle = '#EDEEFF'
        ctx.fillText('NEXTRI', cx, titleY)

        const tagFs = Math.round(titleFs * 0.20)
        ctx.font = `400 ${tagFs}px 'DM Mono', monospace`
        ctx.globalAlpha = 0.28
        ctx.shadowBlur = 0
        ctx.fillStyle = '#7B6EFF'
        ctx.letterSpacing = '2px'
        ctx.fillText('FULLSTACK · CREATIVE · DEVOPS', cx, titleY + titleFs * 0.72)
        ctx.letterSpacing = '0px'

        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
        ctx.restore()

        // Orbit ellipses
        nodes.slice(1).forEach(n => {
            ctx.beginPath()
            ctx.save()
            ctx.translate(cx, cy)
            ctx.scale(1, 0.38)
            ctx.arc(0, 0, n.r * base, 0, Math.PI * 2)
            ctx.restore()
            ctx.strokeStyle = n.color
            ctx.lineWidth = 1
            ctx.globalAlpha = 0.35
            ctx.shadowColor = n.color
            ctx.shadowBlur = 14
            ctx.stroke()
            ctx.globalAlpha = 1
            ctx.shadowBlur = 0
        })

        // Nodes with initials
        nodes.forEach(n => {
            const a = t * n.speed + n.phase
            const nx = cx + Math.cos(a) * n.r * base
            const ny = cy + Math.sin(a) * n.r * base * 0.38
            const nr = n.r === 0 ? base * 0.065 : base * 0.042

            ctx.beginPath()
            ctx.arc(nx, ny, nr, 0, Math.PI * 2)
            ctx.strokeStyle = n.color
            ctx.lineWidth = 1.5
            ctx.globalAlpha = 0.85
            ctx.shadowColor = n.color
            ctx.shadowBlur = 22
            ctx.stroke()
            ctx.globalAlpha = 1
            ctx.shadowBlur = 0

            const fs = Math.max(n.r === 0 ? 13 : 10, Math.round(nr * 0.72))
            ctx.font = `bold ${fs}px monospace`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = n.color
            ctx.globalAlpha = 0.9
            ctx.shadowColor = n.color
            ctx.shadowBlur = 12
            ctx.fillText(n.label, nx, ny)
            ctx.globalAlpha = 1
            ctx.shadowBlur = 0
        })

        requestAnimationFrame(drawNeon)
    }
    drawNeon()
}
