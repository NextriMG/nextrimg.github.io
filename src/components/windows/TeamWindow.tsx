import * as Tabs from '@radix-ui/react-tabs'
import { Globe } from 'lucide-react'
import { useDesktopStore } from '../../store/desktop'
import LionelAvatar from '../avatars/LionelAvatar'
import ItoAvatar from '../avatars/ItoAvatar'
import SitrakaAvatar from '../avatars/SitrakaAvatar'

// lucide-react dropped brand marks — GitHub isn't in the icon set, so it's inlined here.
function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export default function TeamWindow() {
  const { teamMode, setTeamMode } = useDesktopStore()

  return (
    <Tabs.Root
      value={teamMode}
      onValueChange={(v) => setTeamMode(v as 'col' | 'exp')}
    >
      <Tabs.List className="t-toggle" aria-label="Mode d'intervention">
        <Tabs.Trigger value="col" className={`tt${teamMode === 'col' ? ' on' : ''}`}>
          Collectif
        </Tabs.Trigger>
        <Tabs.Trigger value="exp" className={`tt${teamMode === 'exp' ? ' on' : ''}`}>
          Mode Expert
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="col">
        <p className="t-desc">
          En mode collectif, les trois membres travaillent comme une équipe unifiée avec une
          coordination interne fluide et une responsabilité partagée du livrable.
        </p>
        <div className="t-grid">
          <div className="mc-card" data-c="tl">
            <div className="av"><LionelAvatar variant="col" /></div>
            <div className="mc-card-body">
              <div className="mn-row">
                <span className="mn">Lionel Ratovo</span>
                <a
                  href="https://lionel0505.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-link"
                  aria-label="Portfolio de Lionel Ratovo"
                >
                  <Globe size={13} strokeWidth={2} />
                </a>
              </div>
              <div className="mr">Technical Lead · Backend &amp; Data</div>
              <div className="sk-row">
                <span className="sk">Java</span>
                <span className="sk">Node.js</span>
                <span className="sk">PostgreSQL</span>
                <span className="sk">Docker</span>
              </div>
            </div>
          </div>

          <div className="mc-card" data-c="yw">
            <div className="av"><ItoAvatar variant="col" /></div>
            <div className="mc-card-body">
              <div className="mn">Itokiana Rajohnson</div>
              <div className="mr">Full Stack Senior · Chef de Projet</div>
              <div className="sk-row">
                <span className="sk">Spring Boot</span>
                <span className="sk">Angular</span>
                <span className="sk">Agile</span>
                <span className="sk">MySQL</span>
              </div>
            </div>
          </div>

          <div className="mc-card" data-c="or">
            <div className="av"><SitrakaAvatar variant="col" /></div>
            <div className="mc-card-body">
              <div className="mn-row">
                <span className="mn">Sitraka Rasatarivony</span>
                <a
                  href="https://github.com/SitrakaRasata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-link"
                  aria-label="Profil GitHub de Sitraka Rasatarivony"
                >
                  <GithubIcon />
                </a>
              </div>
              <div className="mr">Full Stack · Backend, CI/CD</div>
              <div className="sk-row">
                <span className="sk">TypeScript</span>
                <span className="sk">NestJS</span>
                <span className="sk">React</span>
                <span className="sk">CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="exp">
        <p className="t-desc">
          En mode expert, chaque membre intervient de façon autonome sous l'identité NEXTRI. La
          souplesse d'un freelance avec la fiabilité d'un collectif derrière.
        </p>
        <div className="t-grid">
          <div className="mc-card" data-c="tl">
            <div className="av"><LionelAvatar variant="exp" /></div>
            <div className="mc-card-body">
              <div className="mn-row">
                <span className="mn">Lionel Ratovo</span>
                <a
                  href="https://lionel0505.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-link"
                  aria-label="Portfolio de Lionel Ratovo"
                >
                  <Globe size={13} strokeWidth={2} />
                </a>
              </div>
              <div className="mr">Backend &amp; Data Engineer</div>
              <p className="mc-card-desc">
                APIs REST, architectures scalables, pipelines de données, optimisation SQL, coordination technique.
              </p>
            </div>
          </div>

          <div className="mc-card" data-c="yw">
            <div className="av"><ItoAvatar variant="exp" /></div>
            <div className="mc-card-body">
              <div className="mn">Itokiana Rajohnson</div>
              <div className="mr">Full Stack Senior · PM</div>
              <p className="mc-card-desc">
                Applications en production, spécifications techniques, cycles de tests, interface fonctionnel/technique.
              </p>
            </div>
          </div>

          <div className="mc-card" data-c="or">
            <div className="av"><SitrakaAvatar variant="exp" /></div>
            <div className="mc-card-body">
              <div className="mn-row">
                <span className="mn">Sitraka Rasatarivony</span>
                <a
                  href="https://github.com/SitrakaRasata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-link"
                  aria-label="Profil GitHub de Sitraka Rasatarivony"
                >
                  <GithubIcon />
                </a>
              </div>
              <div className="mr">Full Stack · Backend, CI/CD</div>
              <p className="mc-card-desc">
                Conception d'API et refonte de backends sous contrainte de performance, modélisation et optimisation des données, livraison continue, sécurité applicative dès la conception.
              </p>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
