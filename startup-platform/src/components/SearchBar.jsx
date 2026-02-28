import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TYPE_STYLES } from '../utils/gradients'

export default function SearchBar({ value, onChange, placeholder = 'Search startups, services…', allItems = [] }) {
  const [focused, setFocused]     = useState(false)
  const [selected, setSelected]   = useState(-1)
  const navigate  = useNavigate()
  const inputRef  = useRef(null)
  const listRef   = useRef(null)

  const showSuggestions = focused && value.trim().length >= 1

  const suggestions = showSuggestions
    ? allItems
        .filter((i) => {
          const q = value.toLowerCase()
          return (
            i.name.toLowerCase().includes(q) ||
            i.tagline.toLowerCase().includes(q) ||
            i.tags?.some((t) => t.toLowerCase().includes(q))
          )
        })
        .slice(0, 3)
    : []

  const pick = (item) => {
    onChange('')
    setFocused(false)
    navigate(`/item/${item.id}`)
  }

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (!suggestions.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, -1)) }
    if (e.key === 'Enter' && selected >= 0) { e.preventDefault(); pick(suggestions[selected]) }
    if (e.key === 'Escape') { setFocused(false); setSelected(-1) }
  }

  // Reset selection when suggestions change
  useEffect(() => { setSelected(-1) }, [value])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!inputRef.current?.closest('.search-wrapper')?.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="search-wrapper relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-[#5B6CF6] focus:ring-2 focus:ring-[#5B6CF6]/10 transition-colors"
      />
      {value && (
        <button
          onClick={() => { onChange(''); inputRef.current?.focus() }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 active:text-gray-600"
          aria-label="Clear"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={listRef}
          className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-card z-30 overflow-hidden"
        >
          {suggestions.map((item, i) => {
            const ts = TYPE_STYLES[item.type] || TYPE_STYLES.startup
            return (
              <button
                key={item.id}
                onMouseDown={(e) => { e.preventDefault(); pick(item) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  selected === i ? 'bg-gray-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg leading-none flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.tagline}</p>
                </div>
                <span className={`chip flex-shrink-0 ${ts.bg} ${ts.text}`}>{ts.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* No suggestions hint */}
      {showSuggestions && value.trim().length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-card z-30 px-4 py-3">
          <p className="text-sm text-gray-400 dark:text-gray-500">No matches for "{value}"</p>
        </div>
      )}
    </div>
  )
}
