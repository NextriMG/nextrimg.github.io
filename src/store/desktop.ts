import { create } from 'zustand'
import type { WindowId, Phase, TeamMode } from '../types'

interface DesktopState {
  phase: Phase
  openWindows: WindowId[]
  reducedWindows: WindowId[]
  focusedWindow: WindowId | null
  zCounter: number
  zMap: Record<WindowId, number>
  teamMode: TeamMode
  guideActive: boolean
  setPhase: (p: Phase) => void
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  reduceWindow: (id: WindowId) => void
  restoreWindow: (id: WindowId) => void
  setTeamMode: (m: TeamMode) => void
  setGuideActive: (v: boolean) => void
}

export const useDesktopStore = create<DesktopState>((set) => ({
  phase: 'boot',
  openWindows: [],
  reducedWindows: [],
  focusedWindow: null,
  zCounter: 50,
  zMap: { a: 50, t: 50, s: 50, c: 50 },
  teamMode: 'col',
  guideActive: false,

  setPhase: (p) => set({ phase: p }),

  openWindow: (id) => set((s) => {
    const already = s.openWindows.includes(id)
    const newZ = s.zCounter + 1
    return {
      openWindows: already ? s.openWindows : [...s.openWindows, id],
      reducedWindows: s.reducedWindows.filter((w) => w !== id),
      focusedWindow: id,
      zCounter: newZ,
      zMap: { ...s.zMap, [id]: newZ },
    }
  }),

  closeWindow: (id) => set((s) => ({
    openWindows: s.openWindows.filter((w) => w !== id),
    reducedWindows: s.reducedWindows.filter((w) => w !== id),
    focusedWindow: s.focusedWindow === id ? null : s.focusedWindow,
  })),

  focusWindow: (id) => set((s) => {
    const newZ = s.zCounter + 1
    return {
      focusedWindow: id,
      zCounter: newZ,
      zMap: { ...s.zMap, [id]: newZ },
    }
  }),

  reduceWindow: (id) => set((s) => ({
    reducedWindows: s.reducedWindows.includes(id) ? s.reducedWindows : [...s.reducedWindows, id],
    focusedWindow: s.focusedWindow === id ? null : s.focusedWindow,
  })),

  restoreWindow: (id) => set((s) => {
    const newZ = s.zCounter + 1
    return {
      reducedWindows: s.reducedWindows.filter((w) => w !== id),
      focusedWindow: id,
      zCounter: newZ,
      zMap: { ...s.zMap, [id]: newZ },
    }
  }),

  setTeamMode: (m) => set({ teamMode: m }),
  setGuideActive: (v) => set({ guideActive: v }),
}))
