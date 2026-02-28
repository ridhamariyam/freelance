import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import staticListings from '../data/listings.json'

const Ctx = createContext(null)

const TYPE_DEFAULTS = {
  startup:  { gradient: 'indigo',     emoji: '🚀' },
  service:  { gradient: 'teal',       emoji: '⚡' },
  resource: { gradient: 'indigo-blue',emoji: '📄' },
}

export function AppProvider({ children }) {
  // ── User listings ──────────────────────────────────────
  const [userListings, setUserListings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lb_user_listings') || '[]') }
    catch { return [] }
  })

  const addListing = (data) => {
    const defaults = TYPE_DEFAULTS[data.type] || TYPE_DEFAULTS.startup
    const item = {
      id:       `u${Date.now()}`,
      type:     data.type,
      name:     data.name.trim(),
      tagline:  data.tagline.trim(),
      description: data.description.trim(),
      category: data.category?.trim() || 'General',
      tags:     [],
      stage:    data.stage || null,
      location: data.location?.trim() || null,
      founded:  String(new Date().getFullYear()),
      contact:  data.contact?.trim() || null,
      website:  data.website?.trim() || null,
      gradient: defaults.gradient,
      emoji:    defaults.emoji,
      isUserSubmitted: true,
    }
    setUserListings((prev) => {
      const next = [item, ...prev]
      localStorage.setItem('lb_user_listings', JSON.stringify(next))
      return next
    })
    return item
  }

  const allListings = useMemo(() => [...userListings, ...staticListings], [userListings])

  // ── Business mode ──────────────────────────────────────
  const [businessMode, setBusinessMode] = useState(
    () => localStorage.getItem('lb_biz') === '1'
  )

  const toggleBusinessMode = () =>
    setBusinessMode((v) => {
      localStorage.setItem('lb_biz', v ? '0' : '1')
      return !v
    })

  // ── Dark mode ──────────────────────────────────────────
  const [dark, setDark] = useState(() => {
    const s = localStorage.getItem('lb_theme')
    if (s) return s === 'dark'
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('lb_theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleDark = () => setDark((v) => !v)

  return (
    <Ctx.Provider value={{ allListings, userListings, addListing, businessMode, toggleBusinessMode, dark, toggleDark }}>
      {children}
    </Ctx.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
