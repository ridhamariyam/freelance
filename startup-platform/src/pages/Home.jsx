import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import { useApp } from '../context/AppContext'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const FEATURED_IDS = ['s1', 'sv1', 'r2']

export default function Home() {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')
  const navigate  = useNavigate()
  const { allListings } = useApp()
  const { recent } = useRecentlyViewed()

  const recentItems = useMemo(
    () => recent.map((id) => allListings.find((l) => l.id === id)).filter(Boolean),
    [recent, allListings]
  )

  const featured = useMemo(
    () => allListings.filter((l) => FEATURED_IDS.includes(l.id)),
    [allListings]
  )

  const filtered = useMemo(() => {
    let items = allListings
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
    return items
  }, [category, query, allListings])

  const isSearching = query.trim() || category !== 'all'

  return (
    <main className="pb-nav page-enter">
      {/* Top bar */}
      <div className="px-4 pt-5 pb-1">
        <p className="text-sm text-gray-500 dark:text-gray-400">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">Launchbase</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Discover what's being built</p>
      </div>

      {/* Search with live suggestions */}
      <div className="px-4 mt-4">
        <SearchBar value={query} onChange={setQuery} allItems={allListings} />
      </div>

      {/* Category filter */}
      <div className="mt-3 px-4">
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {/* Search results */}
      {isSearching ? (
        <section className="px-4 mt-5">
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium mb-3">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </p>
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((item, i) => <Card key={item.id} item={item} index={i} />)}
            </div>
          ) : (
            <EmptySearch />
          )}
        </section>
      ) : (
        <>
          {/* Recently viewed */}
          {recentItems.length > 0 && (
            <section className="mt-5">
              <div className="flex items-center justify-between px-4 mb-3">
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Recently viewed</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
                {recentItems.map((item, i) => (
                  <div key={item.id} className="w-56 flex-shrink-0">
                    <Card item={item} index={i} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured */}
          <section className="mt-5">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="font-semibold text-gray-900 dark:text-white">Featured</h2>
              <button onClick={() => navigate('/explore')} className="text-xs font-medium text-[#5B6CF6]">
                See all →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
              {featured.map((item, i) => (
                <div key={item.id} className="w-64 flex-shrink-0">
                  <Card item={item} index={i} />
                </div>
              ))}
            </div>
          </section>

          {/* Recent listings */}
          <section className="px-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900 dark:text-white">Recent Listings</h2>
            </div>
            <div className="space-y-3">
              {allListings.slice(0, 6).map((item, i) => <Card key={item.id} item={item} index={i} />)}
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="w-full mt-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
            >
              View all listings
            </button>
          </section>
        </>
      )}
    </main>
  )
}

function EmptySearch() {
  return (
    <div className="text-center py-16">
      <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">Nothing found</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search or category</p>
    </div>
  )
}
