import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import ServiceCard, { FeaturedCard } from '../components/ServiceCard'
import CategoryCard from '../components/CategoryCard'
import SearchBar from '../components/ui/SearchBar'
import { ServiceCardSkeleton, FeaturedCardSkeleton, CategoryCardSkeleton } from '../components/ui/SkeletonLoader'
import { CATEGORIES } from '../utils/categories'

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title">{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="text-sm font-medium text-primary-600 active:text-primary-700"
        >
          {action}
        </button>
      )}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { data: services, isLoading } = useServices()
  const { isFavorite, toggleFavorite } = useFavorites()

  const featured = useMemo(
    () => services?.filter((s) => s.isFeatured) ?? [],
    [services],
  )

  const popular = useMemo(
    () => services?.filter((s) => s.isAvailable).slice(0, 6) ?? [],
    [services],
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-nav animate-fade-in">
      {/* ── Header ── */}
      <header className="bg-white px-4 pt-14 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-primary-600">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Doha, Qatar</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">What do you need?</h1>
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-gray-600">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>

        {/* Search bar (tappable, navigates to Listings) */}
        <SearchBar
          placeholder="Search services, providers..."
          readOnly
          onFocus={() => navigate('/listings')}
        />
      </header>

      {/* ── Promo Banner ── */}
      <div className="mx-4 mt-5 rounded-2xl bg-primary-600 overflow-hidden relative">
        <div className="px-5 py-4 z-10 relative">
          <p className="text-primary-200 text-xs font-medium mb-0.5">Limited Offer</p>
          <h3 className="text-white font-bold text-[17px] leading-snug">
            20% off your first<br />home cleaning
          </h3>
          <button
            onClick={() => navigate('/listings?category=cleaning')}
            className="mt-3 bg-white text-primary-600 font-semibold text-sm px-4 py-2 rounded-xl active:bg-primary-50 transition-colors"
          >
            Book Now
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
          <svg viewBox="0 0 100 100" className="w-28 h-28 text-white" fill="currentColor">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>
        <div className="absolute right-12 bottom-0 opacity-15">
          <svg viewBox="0 0 80 80" className="w-20 h-20 text-white" fill="currentColor">
            <circle cx="40" cy="40" r="40" />
          </svg>
        </div>
      </div>

      {/* ── Categories ── */}
      <section className="px-4 mt-6">
        <SectionHeader
          title="Categories"
          action="All"
          onAction={() => navigate('/listings')}
        />
        <div className="overflow-x-auto -mx-4 px-4 no-scrollbar">
          <div className="flex gap-4 w-max pb-2">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <CategoryCardSkeleton key={i} />)
              : CATEGORIES.map((cat) => (
                  <CategoryCard key={cat.id} {...cat} />
                ))}
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="mt-7">
        <div className="px-4">
          <SectionHeader
            title="Featured Services"
            action="See all"
            onAction={() => navigate('/listings?featured=true')}
          />
        </div>
        <div className="overflow-x-auto -mx-0 px-4 no-scrollbar">
          <div className="flex gap-3 w-max pb-1">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <FeaturedCardSkeleton key={i} />)
              : featured.map((service) => (
                  <FeaturedCard
                    key={service.id}
                    service={service}
                    isFavorite={isFavorite(service.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* ── Popular ── */}
      <section className="px-4 mt-7">
        <SectionHeader
          title="Popular Near You"
          action="See all"
          onAction={() => navigate('/listings')}
        />
        <div className="flex flex-col gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <ServiceCardSkeleton key={i} />)
            : popular.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isFavorite={isFavorite(service.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="px-4 mt-7 mb-2">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '200+', label: 'Verified\nProviders' },
            { value: '4.7★', label: 'Average\nRating' },
            { value: '5k+', label: 'Happy\nCustomers' },
          ].map(({ value, label }) => (
            <div key={value} className="card p-4 text-center">
              <p className="text-lg font-bold text-primary-600">{value}</p>
              <p className="text-[11px] text-gray-500 leading-tight whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
