import { useDesktopStore } from './store/desktop'
import BootScreen from './components/boot/BootScreen'
import Desktop from './components/desktop/Desktop'

export default function App() {
  const phase = useDesktopStore((s) => s.phase)

  return (
    <>
      <div id="grain" aria-hidden="true" />
      <Desktop />
      {phase === 'boot' && <BootScreen />}
    </>
  )
}
