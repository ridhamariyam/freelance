import { useState, useMemo } from 'react'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'

const SORT_OPTIONS = [
  { id: 'default',  label: 'Default' },
  { id: 'name',     label: 'A–Z' },
  { id: 'category', label: 'Category' },
]

export default function Explore() {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort]         = useState('default')
  const [showSort, setShowSort] = useState(false)
  const { allListings } = useApp()

  const results = useMemo(() => {
    let items = [...allListings]
    if (category !== 'all') items = items.filter((i) => i.type === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.tagline.toLowerCase().includes(q) ||
          i.category?.toLowerCase().includes(q) ||
          i.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }
    if (sort === 'name')     items.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'category') items.sort((a, b) => (a.category || '').localeCompare(b.category || ''))
    return items
  }, [query, category, sort, allListings])

  return (
    <main className="pb-nav page-enter">
      <Header
        title="Explore"
        subtitle={`${allListings.length} listings`}
        action={
          <div className="relative">
            <button
              onClick={() => setShowSort((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Sort
            </button>
            {showSort && (
              <div className="absolute right-0 top-11 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-card z-20 overflow-hidden min-w-[130px]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSort(opt.id); setShowSort(false) }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      sort === opt.id
                        ? 'text-[#5B6CF6] font-semibold bg-[#EEF0FE] dark:bg-indigo-900/30'
                        : 'text-gray-700 dark:text-gray-300 active:bg-gray-50 dark:active:bg-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />

      <div className="px-4 mt-2 space-y-3">
        <SearchBar value={query} onChange={setQuery} allItems={allListings} />
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      <section className="px-4 mt-5">
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium mb-3">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((item, i) => <Card key={item.id} item={item} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="1.8" />
                <path d="M20 20l-3-3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">No results found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </section>
    </main>
  )
}
