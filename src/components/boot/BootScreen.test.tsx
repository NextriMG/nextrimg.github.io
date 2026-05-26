import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { useDesktopStore } from '../../store/desktop'
import BootScreen from './BootScreen'

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn(() => ({ kill: vi.fn() })),
    set: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis(), onComplete: vi.fn() })),
    killTweensOf: vi.fn(),
  },
}))
vi.mock('@gsap/react', () => ({ useGSAP: vi.fn() }))

describe('BootScreen', () => {
  beforeEach(() => useDesktopStore.setState({ phase: 'boot' }))

  it('rend les blocs NEX et TRI avec les lettres', () => {
    const { container } = render(<BootScreen />)
    expect(container.querySelector('#boot-nex')?.textContent).toContain('N')
    expect(container.querySelector('#boot-nex')?.textContent).toContain('X')
    expect(container.querySelector('#boot-tri')?.textContent).toContain('T')
    expect(container.querySelector('#boot-tri')?.textContent).toContain('I')
  })

  it('rend les spans de remplissage de couleur (.bl-fill)', () => {
    const { container } = render(<BootScreen />)
    const fills = container.querySelectorAll('.bl-fill')
    expect(fills.length).toBe(6)
  })

  it('rend le strip d\'images', () => {
    const { container } = render(<BootScreen />)
    expect(container.querySelector('#boot-strip')).toBeInTheDocument()
    const slots = container.querySelectorAll('#boot-strip .ss')
    expect(slots.length).toBeGreaterThan(0)
  })

  it('rend la barre de progression', () => {
    const { container } = render(<BootScreen />)
    expect(container.querySelector('#boot-bar')).toBeInTheDocument()
    expect(container.querySelector('.bp-fill')).toBeInTheDocument()
  })

})
