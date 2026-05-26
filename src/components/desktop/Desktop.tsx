import Menubar from './Menubar'
import Wallpaper from './Wallpaper'
import Hero from './Hero'
import Dock from './Dock'
import WindowShell from '../windows/WindowShell'
import AboutWindow from '../windows/AboutWindow'
import TeamWindow from '../windows/TeamWindow'
import ServicesWindow from '../windows/ServicesWindow'
import ContactWindow from '../windows/ContactWindow'

export default function Desktop() {
  return (
    <div id="desktop">
      <Menubar />
      <main id="desk-area">
        <Wallpaper />
        <Hero />
        <WindowShell id="a" title="À propos de NEXTRI"><AboutWindow /></WindowShell>
        <WindowShell id="t" title="L'équipe NEXTRI"><TeamWindow /></WindowShell>
        <WindowShell id="s" title="Nos services"><ServicesWindow /></WindowShell>
        <WindowShell id="c" title="Prendre contact"><ContactWindow /></WindowShell>
        <Dock />
      </main>
    </div>
  )
}
