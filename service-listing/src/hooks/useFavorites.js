import { useState, useCallback } from 'react'

const STORAGE_KEY = 'serviq_favorites'

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveToStorage = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // storage unavailable
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => loadFromStorage())

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      saveToStorage(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(id),
    [favoriteIds],
  )

  return { favoriteIds, toggleFavorite, isFavorite }
}
