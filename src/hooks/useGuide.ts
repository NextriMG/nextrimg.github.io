import { useCallback } from 'react'
import { driver } from 'driver.js'
import { useDesktopStore } from '../store/desktop'

export function useGuide() {
  const setGuideActive = useDesktopStore((s) => s.setGuideActive)

  const start = useCallback(() => {
    setGuideActive(true)
    driver({
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      nextBtnText: 'Suivant →',
      prevBtnText: '← Retour',
      doneBtnText: "C'est parti !",
      onDestroyed: () => {
        localStorage.setItem('nxt-g', '1')
        setGuideActive(false)
      },
      steps: [
        {
          element: '#dk',
          popover: {
            title: 'Bienvenue sur NEXTRI OS',
            description: "Ce dock est votre point d'entrée. Cliquez sur une icône pour ouvrir la section correspondante.",
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-a',
          popover: {
            title: 'À propos',
            description: "Découvrez NEXTRI, notre approche et nos deux modes d'intervention.",
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-t',
          popover: {
            title: "L'équipe",
            description: 'Rencontrez les trois membres. Le toggle "Collectif / Expert" vous explique comment nous intervenons selon vos besoins.',
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-s',
          popover: {
            title: 'Nos services',
            description: 'Développement web, backend, infrastructure, audit : tout ce que nous faisons.',
            side: 'top', align: 'center',
          },
        },
        {
          element: '#di-c',
          popover: {
            title: 'Nous contacter',
            description: 'Décrivez votre projet et recevez une réponse sous 24h.',
            side: 'top', align: 'center',
          },
        },
        {
          element: '#th-btn',
          popover: {
            title: 'Thème sombre / clair',
            description: 'Basculez entre les deux modes selon vos préférences.',
            side: 'bottom', align: 'end',
          },
        },
      ],
    }).drive()
  }, [setGuideActive])

  return { start }
}
