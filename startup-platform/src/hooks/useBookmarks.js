import { useState, useEffect, useCallback } from 'react'

const KEY = 'lb_bookmarks'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  const toggle = useCallback((id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }, [])

  const isBookmarked = useCallback((id) => bookmarks.includes(id), [bookmarks])

  return { bookmarks, toggle, isBookmarked }
}
