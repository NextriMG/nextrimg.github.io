import * as Tabs from '@radix-ui/react-tabs'
import { useDesktopStore } from '../../store/desktop'
import LionelAvatar from '../avatars/LionelAvatar'
import ItoAvatar from '../avatars/ItoAvatar'
import SitrakaAvatar from '../avatars/SitrakaAvatar'

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
              <div className="mn">Lionel Ratovo</div>
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
              <div className="mn">Sitraka Rasatarivony</div>
              <div className="mr">Full Stack · DevOps / DevSecOps</div>
              <div className="sk-row">
                <span className="sk">NestJS</span>
                <span className="sk">React</span>
                <span className="sk">CI/CD</span>
                <span className="sk">Python</span>
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
              <div className="mn">Lionel Ratovo</div>
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
              <div className="mn">Sitraka Rasatarivony</div>
              <div className="mr">Full Stack · DevOps / DevSecOps</div>
              <p className="mc-card-desc">
                Déploiements CI/CD, NestJS, React, FastAPI, clean code, automatisation, performance.
              </p>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
