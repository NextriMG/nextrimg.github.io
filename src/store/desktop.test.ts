import { describe, it, expect, beforeEach } from 'vitest'
import { useDesktopStore } from './desktop'

const reset = () => useDesktopStore.setState({
  phase: 'boot',
  openWindows: [],
  focusedWindow: null,
  zCounter: 50,
  zMap: { a: 50, t: 50, s: 50, c: 50 },
  teamMode: 'col',
})

describe('useDesktopStore', () => {
  beforeEach(reset)

  it('openWindow adds to openWindows and sets focusedWindow', () => {
    useDesktopStore.getState().openWindow('a')
    const s = useDesktopStore.getState()
    expect(s.openWindows).toContain('a')
    expect(s.focusedWindow).toBe('a')
  })

  it('openWindow is idempotent, no duplicates', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().openWindow('a')
    expect(useDesktopStore.getState().openWindows.filter(w => w === 'a')).toHaveLength(1)
  })

  it('openWindow increments zCounter and updates zMap', () => {
    useDesktopStore.getState().openWindow('a')
    const s = useDesktopStore.getState()
    expect(s.zCounter).toBe(51)
    expect(s.zMap['a']).toBe(51)
  })

  it('closeWindow removes from openWindows', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().closeWindow('a')
    expect(useDesktopStore.getState().openWindows).not.toContain('a')
  })

  it('closeWindow clears focusedWindow when it was the closed one', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().closeWindow('a')
    expect(useDesktopStore.getState().focusedWindow).toBeNull()
  })

  it('closeWindow keeps focusedWindow when a different window closes', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().openWindow('t')
    useDesktopStore.getState().closeWindow('a')
    expect(useDesktopStore.getState().focusedWindow).toBe('t')
  })

  it('closeWindow transfers focus to the next open window by z-index', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().openWindow('t')
    useDesktopStore.getState().openWindow('s')
    useDesktopStore.getState().focusWindow('t')
    useDesktopStore.getState().closeWindow('t')
    const s = useDesktopStore.getState()
    expect(s.focusedWindow).not.toBeNull()
    expect(s.focusedWindow).not.toBe('t')
  })

  it('closeWindow does not transfer focus to a reduced window', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().openWindow('t')
    useDesktopStore.getState().reduceWindow('a')
    useDesktopStore.getState().closeWindow('t')
    expect(useDesktopStore.getState().focusedWindow).toBeNull()
  })

  it('focusWindow makes it the highest z-index', () => {
    useDesktopStore.getState().openWindow('a')
    useDesktopStore.getState().openWindow('t')
    const zT = useDesktopStore.getState().zMap['t']
    useDesktopStore.getState().focusWindow('a')
    expect(useDesktopStore.getState().zMap['a']).toBeGreaterThan(zT)
    expect(useDesktopStore.getState().focusedWindow).toBe('a')
  })

  it('setPhase transitions phase', () => {
    useDesktopStore.getState().setPhase('desktop')
    expect(useDesktopStore.getState().phase).toBe('desktop')
  })

  it('setTeamMode switches mode', () => {
    useDesktopStore.getState().setTeamMode('exp')
    expect(useDesktopStore.getState().teamMode).toBe('exp')
  })
})
