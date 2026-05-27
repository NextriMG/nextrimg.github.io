/// <reference types="vite/client" />

interface TurnstileRenderOptions {
  sitekey: string
  size?: 'normal' | 'compact' | 'invisible'
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  [key: string]: unknown
}

interface TurnstileInstance {
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string
  reset: (widgetId: string) => void
  execute: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileInstance
  }
}
