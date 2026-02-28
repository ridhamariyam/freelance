import { useState, useCallback } from 'react'

const KEY = 'lb_recent'
const MAX = 3

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState(load)

  const track = useCallback((id) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((r) => r !== id)].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { recent, track }
}
