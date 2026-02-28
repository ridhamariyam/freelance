import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
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
          {action} →
        </button>
      )}
    </div>
  )
}

function InstallBanner({ onInstall, onDismiss }) {
  return (
    <div className="mx-4 mt-4 flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-2xl px-4 py-3 animate-pop-in">
      <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
          <path d="M12 3v12M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 21H4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-tight">Add Serviq to Home Screen</p>
        <p className="text-xs text-gray-500 mt-0.5">Fast, offline-ready app experience</p>
      </div>
      <button
        onClick={onInstall}
        className="text-xs font-semibold text-white bg-primary-600 px-3 py-1.5 rounded-lg active:bg-primary-700 shrink-0 transition-colors"
      >
        Install
      </button>
      <button
        onClick={onDismiss}
        className="text-gray-400 active:text-gray-600 shrink-0 -mr-1 transition-colors"
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { data: services, isLoading } = useServices()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { canInstall, install } = useInstallPrompt()
  const [installDismissed, setInstallDismissed] = useState(false)

  const featured = useMemo(
    () => services?.filter((s) => s.isFeatured) ?? [],
    [services],
  )

  const popular = useMemo(
    () => services?.filter((s) => s.isAvailable).slice(0, 6) ?? [],
    [services],
  )

  const showInstallBanner = canInstall && !installDismissed

  return (
    <div className="min-h-screen bg-gray-50 pb-nav animate-fade-in">
      {/* ── Header ── */}
      <header className="bg-white px-4 pt-14 pb-4 sticky top-0 z-30 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <button className="flex items-center gap-1 text-xs text-gray-500 mb-0.5 active:text-gray-700">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-primary-600">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="font-medium">Doha, Qatar</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">What do you need?</h1>
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-gray-600">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Search bar (tappable, navigates to Listings) */}
        <SearchBar
          placeholder="Search services, providers..."
          readOnly
          onFocus={() => navigate('/listings')}
        />
      </header>

      {/* ── PWA Install Banner ── */}
      {showInstallBanner && (
        <InstallBanner
          onInstall={() => { install(); setInstallDismissed(true) }}
          onDismiss={() => setInstallDismissed(true)}
        />
      )}

      {/* ── Promo Banner ── */}
      <div className="mx-4 mt-5 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
        <div className="px-5 py-5 z-10 relative">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            Limited Offer
          </div>
          <h3 className="text-white font-bold text-[18px] leading-snug mb-3">
            20% off your first<br />home cleaning
          </h3>
          <button
            onClick={() => navigate('/listings?category=cleaning')}
            className="bg-white text-primary-600 font-semibold text-sm px-4 py-2.5 rounded-xl active:bg-primary-50 transition-colors"
          >
            Book Now →
          </button>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-0 top-0 w-36 h-36 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute right-8 bottom-0 w-24 h-24 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translateY(40%)' }} />
      </div>

      {/* ── Categories ── */}
      <section className="px-4 mt-7">
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
        <div className="overflow-x-auto px-4 no-scrollbar">
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
            { value: '200+', label: 'Verified\nProviders', icon: '✓' },
            { value: '4.7★', label: 'Average\nRating', icon: '★' },
            { value: '5k+', label: 'Happy\nCustomers', icon: '♥' },
          ].map(({ value, label }) => (
            <div key={value} className="card p-4 text-center">
              <p className="text-lg font-bold text-primary-600">{value}</p>
              <p className="text-[11px] text-gray-500 leading-tight whitespace-pre-line mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
