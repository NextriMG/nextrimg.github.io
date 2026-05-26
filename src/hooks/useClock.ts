import { useState, useEffect } from 'react'

const fmt = (d: Date) =>
  String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')

export function useClock(): string {
  const [time, setTime] = useState(() => fmt(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(fmt(new Date())), 30_000)
    return () => clearInterval(id)
  }, [])

  return time
}
