import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useServiceById } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import { getCategoryById } from '../utils/categories'

function Bone({ className }) {
  return <div className={`bg-gray-200 rounded-lg animate-shimmer ${className}`} />
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Bone className="w-full h-72 rounded-none" />
      <div className="bg-white -mt-6 rounded-t-3xl px-5 pt-6 space-y-4 pb-32">
        <div className="flex gap-2">
          <Bone className="w-20 h-6 rounded-full" />
          <Bone className="w-24 h-6 rounded-full" />
        </div>
        <Bone className="w-4/5 h-7" />
        <Bone className="w-full h-5" />
        <Bone className="w-full h-20 rounded-2xl" />
        <div className="flex gap-2 pt-1">
          <Bone className="w-20 h-7 rounded-full" />
          <Bone className="w-24 h-7 rounded-full" />
          <Bone className="w-16 h-7 rounded-full" />
        </div>
        <div className="space-y-2 pt-2">
          <Bone className="w-full h-4" />
          <Bone className="w-full h-4" />
          <Bone className="w-3/4 h-4" />
        </div>
        <Bone className="w-full h-16 rounded-xl" />
      </div>
    </div>
  )
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: service, isLoading, isError } = useServiceById(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = service ? isFavorite(service.id) : false
  const [heroError, setHeroError] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [heartAnim, setHeartAnim] = useState(false)

  if (isLoading) return <DetailSkeleton />

  if (isError || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 text-gray-400">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Startup not found</h2>
        <button onClick={() => navigate('/listings')} className="btn-primary">
          Back to Explore
        </button>
      </div>
    )
  }

  const category = getCategoryById(service.category)

  return (
    <div className="min-h-screen bg-white pb-28 animate-fade-in">
      {/* ── Hero Image ── */}
      <div className="relative bg-gray-200">
        {!heroLoaded && !heroError && (
          <div className="w-full h-72 bg-gray-200 animate-shimmer" />
        )}
        {heroError ? (
          <div
            className="w-full h-72 flex items-center justify-center"
            style={{ backgroundColor: category?.bg || '#F3F4F6' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={category?.color || '#9CA3AF'} strokeWidth={1.5} className="w-16 h-16 opacity-30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          <img
            src={service.image}
            alt={service.name}
            className={`w-full h-72 object-cover transition-opacity duration-300 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setHeroLoaded(true)}
            onError={() => setHeroError(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm active:bg-white transition-colors shadow-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5 text-gray-800">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Save button */}
        <button
          onClick={() => { setHeartAnim(true); toggleFavorite(service.id) }}
          className="absolute top-12 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm active:bg-white transition-colors shadow-sm"
        >
          <svg
            viewBox="0 0 24 24"
            fill={saved ? '#EF4444' : 'none'}
            stroke={saved ? '#EF4444' : '#374151'}
            strokeWidth={1.8}
            className={`w-5 h-5 transition-colors duration-200 ${heartAnim ? 'animate-heartbeat' : ''}`}
            onAnimationEnd={() => setHeartAnim(false)}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Content Card ── */}
      <div className="bg-white -mt-6 rounded-t-3xl px-5 pt-5 relative z-10">
        {/* Category + badge row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: category?.bg || '#F3F4F6', color: category?.color || '#374151' }}
          >
            {service.categoryLabel}
          </span>
          {service.badge === 'trending' && (
            <span className="badge badge-trending">↑ Trending</span>
          )}
          {service.badge === 'new' && (
            <span className="badge badge-new">✦ New</span>
          )}
          {service.badge === 'featured' && (
            <span className="badge badge-featured">★ Featured</span>
          )}
        </div>

        {/* Name */}
        <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-1.5">
          {service.name}
        </h1>

        {/* Tagline */}
        <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{service.tagline}</p>

        {/* Rating + upvotes row */}
        <div className="flex items-center gap-3 mb-5">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-4 h-4 shrink-0">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
            <span className="text-sm text-gray-400">({service.reviewCount} reviews)</span>
          </span>
          <span className="text-gray-200">·</span>
          <span className="text-sm font-medium text-gray-600">
            ▲ {service.upvotes?.toLocaleString()} upvotes
          </span>
        </div>

        {/* Stats bar */}
        <div className="flex items-stretch gap-0 mb-5 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
          {[
            { label: 'Stage', value: service.stage },
            { label: 'Founded', value: service.founded },
            { label: 'Team', value: service.teamSize },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex-1 px-3 py-3.5 text-center ${i < 2 ? 'border-r border-gray-200' : ''}`}
            >
              <p className="text-[11px] text-gray-400 font-medium mb-0.5">{label}</p>
              <p className="text-[13px] font-bold text-gray-900 truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span key={tag} className="chip chip-default text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-6" />

        {/* About */}
        <h2 className="text-base font-semibold text-gray-900 mb-2.5">About</h2>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{service.description}</p>

        {/* Location row */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0 text-primary-500">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {service.location}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-6" />

        {/* Maker card */}
        <h2 className="text-base font-semibold text-gray-900 mb-3">Made by</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          {avatarError ? (
            <div className="w-14 h-14 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl shrink-0">
              {service.maker?.name?.[0] || '?'}
            </div>
          ) : (
            <img
              src={service.maker?.avatar}
              alt={service.maker?.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
              onError={() => setAvatarError(true)}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="font-semibold text-gray-900 text-[15px] truncate">{service.maker?.name}</p>
              <svg viewBox="0 0 20 20" fill="#4F46E5" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">{service.maker?.title}</p>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* ── Sticky Bottom CTA ── */}
      <div
        className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3 z-50"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
      >
        <a
          href={service.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full h-12 text-[15px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Visit Website
        </a>
      </div>
    </div>
  )
}
