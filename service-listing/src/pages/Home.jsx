import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import { useInstallPrompt } from '../hooks/useInstallPrompt'
import ServiceCard, { FeaturedCard, TrendingCard } from '../components/ServiceCard'
import CategoryCard from '../components/CategoryCard'
import SearchBar from '../components/ui/SearchBar'
import { ServiceCardSkeleton, FeaturedCardSkeleton, CategoryCardSkeleton, TrendingCardSkeleton } from '../components/ui/SkeletonLoader'
import { CATEGORIES } from '../utils/categories'

/* ─── Section header ────────────────────────────────────────── */

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title">{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="text-sm font-medium text-primary-600 active:text-primary-700 transition-colors"
        >
          {action} →
        </button>
      )}
    </div>
  )
}

/* ─── PWA Install Banner ─────────────────────────────────────── */

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
        <p className="text-sm font-semibold text-gray-900 leading-tight">Add Nexus to Home Screen</p>
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

/* ─── Hero Carousel ──────────────────────────────────────────── */

const SLIDES = [
  {
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    eyebrow: 'Discover Startups',
    title: 'Find the next\nbig thing',
    sub: 'Explore 200+ curated startups & tools',
    cta: 'Explore Now',
    href: '/listings',
  },
  {
    gradient: 'linear-gradient(135deg, #0891B2 0%, #0284C7 100%)',
    eyebrow: 'Top SaaS Tools',
    title: 'Build smarter,\nnot harder',
    sub: 'Discover tools built for founders',
    cta: 'Browse Tools',
    href: '/listings?category=saas',
  },
  {
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    eyebrow: 'Funding & Resources',
    title: 'Fuel your\nstartup journey',
    sub: 'Connect with investors & resources',
    cta: 'Learn More',
    href: '/listings?category=funding',
  },
]

function HeroCarousel() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const touchStart = useRef(null)
  const timerRef = useRef(null)

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, 3500)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const goTo = (idx) => {
    setActive(idx)
    resetTimer()
  }

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      goTo(diff > 0
        ? (active + 1) % SLIDES.length
        : (active - 1 + SLIDES.length) % SLIDES.length
      )
    }
    touchStart.current = null
  }

  const slide = SLIDES[active]

  return (
    <div
      className="mx-4 mt-5 rounded-2xl overflow-hidden relative select-none"
      style={{ background: slide.gradient, transition: 'background 0.4s ease' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="px-5 py-6 relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          {slide.eyebrow}
        </div>
        <h3 className="text-white font-bold text-[20px] leading-tight mb-1 whitespace-pre-line">
          {slide.title}
        </h3>
        <p className="text-white/75 text-[13px] mb-4">{slide.sub}</p>
        <button
          onClick={() => navigate(slide.href)}
          className="bg-white text-primary-600 font-semibold text-sm px-4 py-2.5 rounded-xl active:bg-primary-50 transition-colors"
        >
          {slide.cta} →
        </button>
      </div>

      {/* Decorative circles */}
      <div className="absolute right-0 top-0 w-36 h-36 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute right-8 bottom-0 w-24 h-24 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translateY(40%)' }} />

      {/* Dot indicators */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Home page ──────────────────────────────────────────────── */

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

  const trending = useMemo(
    () => services?.filter((s) => s.isTrending) ?? [],
    [services],
  )

  const newItems = useMemo(
    () => services?.filter((s) => s.isNew) ?? [],
    [services],
  )

  const showInstallBanner = canInstall && !installDismissed

  return (
    <div className="min-h-screen bg-gray-50 pb-nav animate-fade-in">
      {/* ── Header ── */}
      <header className="bg-white px-4 pt-14 pb-4 sticky top-0 z-30 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Good morning 👋</p>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Explore Nexus</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-gray-600">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar
          placeholder="Search startups, tools..."
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

      {/* ── Hero Carousel ── */}
      <HeroCarousel />

      {/* ── Categories ── */}
      <section className="px-4 mt-7">
        <SectionHeader
          title="Categories"
          action="All"
          onAction={() => navigate('/listings')}
        />
        <div className="grid grid-cols-4 gap-3">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CategoryCardSkeleton key={i} />)
            : CATEGORIES.map((cat) => (
                <CategoryCard key={cat.id} {...cat} />
              ))}
        </div>
      </section>

      {/* ── Featured Startups ── */}
      <section className="mt-7">
        <div className="px-4">
          <SectionHeader
            title="Featured Startups"
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

      {/* ── Trending Now ── */}
      <section className="px-4 mt-7">
        <SectionHeader
          title="Trending Now"
          action="See all"
          onAction={() => navigate('/listings')}
        />
        <div className="flex flex-col gap-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <TrendingCardSkeleton key={i} />)
            : trending.map((service) => (
                <TrendingCard
                  key={service.id}
                  service={service}
                  isFavorite={isFavorite(service.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
        </div>
      </section>

      {/* ── Recently Launched ── */}
      {(isLoading || newItems.length > 0) && (
        <section className="px-4 mt-7">
          <SectionHeader
            title="Recently Launched"
            action="See all"
            onAction={() => navigate('/listings')}
          />
          <div className="flex flex-col gap-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <TrendingCardSkeleton key={i} />)
              : newItems.map((service) => (
                  <TrendingCard
                    key={service.id}
                    service={service}
                    isFavorite={isFavorite(service.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
          </div>
        </section>
      )}

      {/* ── Trust Stats ── */}
      <section className="px-4 mt-7 mb-2">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '200+', label: 'Curated\nStartups' },
            { value: '4.8★', label: 'Average\nRating' },
            { value: '12k+', label: 'Founders\nJoined' },
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
