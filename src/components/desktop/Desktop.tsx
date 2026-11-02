import Menubar from './Menubar'
import Wallpaper from './Wallpaper'
import Hero from './Hero'
import Dock from './Dock'
import WindowShell from '../windows/WindowShell'
import AboutWindow from '../windows/AboutWindow'
import TeamWindow from '../windows/TeamWindow'
import ServicesWindow from '../windows/ServicesWindow'
import ContactWindow from '../windows/ContactWindow'
import { t } from '../../i18n'

export default function Desktop() {
  return (
    <div id="desktop">
      <Menubar />
      <main id="desk-area">
        <Wallpaper />
        <Hero />
        <WindowShell id="a" title={t().windows.about}><AboutWindow /></WindowShell>
        <WindowShell id="t" title={t().windows.team}><TeamWindow /></WindowShell>
        <WindowShell id="s" title={t().windows.services}><ServicesWindow /></WindowShell>
        <WindowShell id="c" title={t().windows.contact}><ContactWindow /></WindowShell>
        <Dock />
      </main>
    </div>
  )
}
