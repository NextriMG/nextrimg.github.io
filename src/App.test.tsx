import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { useDesktopStore } from './store/desktop'
import App from './App'

vi.mock('./components/boot/BootScreen', () => ({
  default: () => <div data-testid="boot-screen" />,
}))
vi.mock('./components/desktop/Desktop', () => ({
  default: () => <div id="desktop" data-testid="desktop" />,
}))

describe('App', () => {
  beforeEach(() => useDesktopStore.setState({ phase: 'boot' }))

  it('rend Desktop dans le DOM pendant le boot', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('desktop')).toBeInTheDocument()
  })

  it('rend BootScreen pendant la phase boot', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('boot-screen')).toBeInTheDocument()
  })

  it('ne rend pas BootScreen pendant la phase desktop', () => {
    useDesktopStore.setState({ phase: 'desktop' })
    const { queryByTestId } = render(<App />)
    expect(queryByTestId('boot-screen')).not.toBeInTheDocument()
  })

  it('rend Desktop pendant la phase desktop', () => {
    useDesktopStore.setState({ phase: 'desktop' })
    const { getByTestId } = render(<App />)
    expect(getByTestId('desktop')).toBeInTheDocument()
  })
})
