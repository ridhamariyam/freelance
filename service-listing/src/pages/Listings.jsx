import { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import ServiceCard from '../components/ServiceCard'
import SearchBar from '../components/ui/SearchBar'
import { ListingSkeleton } from '../components/ui/SkeletonLoader'
import { CATEGORIES } from '../utils/categories'
import { filterServices, sortServices } from '../utils/helpers'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommended' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price', label: 'Lowest Price' },
  { value: 'reviews', label: 'Most Reviewed' },
]

export default function Listings() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialCategory = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('search') || ''
  const initialFeatured = searchParams.get('featured') === 'true'

  const [search, setSearch] = useState(initialSearch)
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('default')
  const [showSort, setShowSort] = useState(false)

  const { data: services, isLoading } = useServices()
  const { isFavorite, toggleFavorite } = useFavorites()

  const searchRef = useRef(null)

  // Sync search → URL
  useEffect(() => {
    const params = {}
    if (activeCategory !== 'all') params.category = activeCategory
    if (search) params.search = search
    if (initialFeatured) params.featured = 'true'
    setSearchParams(params, { replace: true })
  }, [search, activeCategory])

  const filtered = useMemo(() => {
    if (!services) return []
    const result = filterServices(services, {
      category: activeCategory,
      search,
      featured: initialFeatured,
    })
    return sortServices(result, sortBy)
  }, [services, activeCategory, search, sortBy, initialFeatured])

  const allCategoryOptions = [{ id: 'all', label: 'All' }, ...CATEGORIES]

  return (
    <div className="min-h-screen bg-gray-50 pb-nav animate-fade-in">
      {/* ── Sticky Header ── */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 shrink-0 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gray-700">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search services..."
          />
        </div>

        {/* Category chips */}
        <div className="overflow-x-auto no-scrollbar px-4 pb-3">
          <div className="flex gap-2 w-max">
            {allCategoryOptions.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`chip whitespace-nowrap ${
                  activeCategory === id ? 'chip-active' : 'chip-default'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm text-gray-500">
          {isLoading ? (
            <span className="inline-block w-24 h-4 bg-gray-200 rounded animate-shimmer" />
          ) : (
            <span>
              <span className="font-semibold text-gray-900">{filtered.length}</span> services found
            </span>
          )}
        </p>

        {/* Sort button */}
        <div className="relative">
          <button
            onClick={() => setShowSort((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 active:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
            </svg>
            Sort
          </button>

          {showSort && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden animate-slide-up">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value)
                      setShowSort(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors active:bg-gray-50 ${
                      sortBy === opt.value
                        ? 'text-primary-600 font-semibold bg-primary-50'
                        : 'text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── List ── */}
      <div className="px-4 pb-4">
        {isLoading ? (
          <ListingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState query={search} onReset={() => { setSearch(''); setActiveCategory('all') }} />
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isFavorite={isFavorite(service.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ query, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 text-gray-400">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          <path d="M8 11h6M11 8v6" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">No results found</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-5">
        {query
          ? `We couldn't find anything for "${query}". Try a different search.`
          : 'No services in this category yet. Try another category.'}
      </p>
      <button onClick={onReset} className="btn-primary px-6 py-2.5 text-sm">
        Clear filters
      </button>
    </div>
  )
}
