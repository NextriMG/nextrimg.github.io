import { useCallback } from 'react'
import { driver } from 'driver.js'
import { useDesktopStore } from '../store/desktop'
import { t } from '../i18n'

export function useGuide() {
  const setGuideActive = useDesktopStore((s) => s.setGuideActive)

  const start = useCallback(() => {
    setGuideActive(true)
    const m = t().guide
    driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      nextBtnText: m.next,
      prevBtnText: m.prev,
      doneBtnText: m.done,
      onDestroyed: () => {
        localStorage.setItem('nxt-g', '1')
        setGuideActive(false)
      },
      steps: [
        {
          element: '#dk',
          popover: {
            title: m.dockTitle,
            description: m.dockText,
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-a',
          popover: {
            title: m.aboutTitle,
            description: m.aboutText,
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-t',
          popover: {
            title: m.teamTitle,
            description: m.teamText,
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-s',
          popover: {
            title: m.servicesTitle,
            description: m.servicesText,
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-c',
          popover: {
            title: m.contactTitle,
            description: m.contactText,
            side: 'top', align: 'center',
          },
        },
        {
          element: '#th-btn',
          popover: {
            title: m.themeTitle,
            description: m.themeText,
            side: 'bottom', align: 'end',
          },
        },
      ],
    }).drive()
  }, [setGuideActive])

  return { start }
}
