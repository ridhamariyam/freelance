import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategoryById } from '../utils/categories'

/* ─── Shared sub-components ──────────────────────────────────── */

function HeartIcon({ filled, animating, onAnimationEnd }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? '#EF4444' : 'none'}
      stroke={filled ? '#EF4444' : '#9CA3AF'}
      strokeWidth={1.8}
      className={`w-4 h-4 transition-colors duration-200 ${animating ? 'animate-heartbeat' : ''}`}
      onAnimationEnd={onAnimationEnd}
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

const BADGE_MAP = {
  trending: { cls: 'badge badge-trending', label: '↑ Trending' },
  new:      { cls: 'badge badge-new',      label: '✦ New' },
  featured: { cls: 'badge badge-featured', label: '★ Featured' },
}

function Badge({ badge }) {
  const b = BADGE_MAP[badge]
  if (!b) return null
  return <span className={b.cls}>{b.label}</span>
}

function StarRow({ rating, reviewCount, upvotes }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-gray-400">
      <span className="flex items-center gap-0.5">
        <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3.5 h-3.5 shrink-0">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="font-semibold text-gray-700">{rating}</span>
      </span>
      <span className="text-gray-200">·</span>
      <span>▲ {upvotes.toLocaleString()}</span>
      <span className="text-gray-200">·</span>
      <span>{reviewCount} reviews</span>
    </div>
  )
}

function ImageBox({ src, alt, className, category }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative bg-gray-100 overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-shimmer" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: category?.bg || '#F3F4F6' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={category?.color || '#9CA3AF'} strokeWidth={1.5} className="w-8 h-8 opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

/* ─── Main card (Listings + Saved pages) ─────────────────────── */

export default function ServiceCard({ service, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  const category = getCategoryById(service.category)
  const [heartAnim, setHeartAnim] = useState(false)

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-150"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)' }}
      onClick={() => navigate(`/listings/${service.id}`)}
    >
      {/* Cover Image */}
      <div className="relative">
        <ImageBox
          src={service.image}
          alt={service.name}
          className="h-[180px]"
          category={category}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        {/* Badge */}
        {service.badge && (
          <div className="absolute top-3 left-3">
            <Badge badge={service.badge} />
          </div>
        )}
        {/* Category pill */}
        <div
          className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: category?.bg || '#F3F4F6', color: category?.color || '#374151' }}
        >
          {service.categoryLabel}
        </div>
        {/* Heart */}
        <button
          className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm active:bg-white transition-colors shadow-sm"
          onClick={(e) => { e.stopPropagation(); setHeartAnim(true); onToggleFavorite?.(service.id) }}
          aria-label={isFavorite ? 'Unsave' : 'Save'}
        >
          <HeartIcon filled={isFavorite} animating={heartAnim} onAnimationEnd={() => setHeartAnim(false)} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{service.name}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">{service.tagline}</p>

        <StarRow rating={service.rating} reviewCount={service.reviewCount} upvotes={service.upvotes} />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {service.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
          <span className="text-[11px] text-gray-400 px-1 flex items-center gap-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {service.location}
          </span>
        </div>

        {/* Stage chip */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <span className="text-[11px] font-semibold text-gray-400">Stage</span>
          <span className="text-[11px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
            {service.stage}
          </span>
          <span className="text-[11px] text-gray-400 ml-auto">Est. {service.founded}</span>
        </div>
      </div>
    </article>
  )
}

/* ─── Featured card (horizontal scroll on Home) ──────────────── */

export function FeaturedCard({ service, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  const category = getCategoryById(service.category)
  const [heartAnim, setHeartAnim] = useState(false)

  return (
    <article
      className="w-[168px] shrink-0 bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-150"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)' }}
      onClick={() => navigate(`/listings/${service.id}`)}
    >
      <div className="relative">
        <ImageBox
          src={service.image}
          alt={service.name}
          className="h-[108px]"
          category={category}
        />
        {service.badge && (
          <div className="absolute top-2 left-2">
            <Badge badge={service.badge} />
          </div>
        )}
        <button
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); setHeartAnim(true); onToggleFavorite?.(service.id) }}
        >
          <HeartIcon filled={isFavorite} animating={heartAnim} onAnimationEnd={() => setHeartAnim(false)} />
        </button>
      </div>
      <div className="p-3">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: category?.bg || '#F3F4F6', color: category?.color || '#374151' }}
        >
          {service.categoryLabel}
        </span>
        <h3 className="font-bold text-[13px] text-gray-900 mt-2 leading-snug line-clamp-1">{service.name}</h3>
        <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">{service.tagline}</p>
        <div className="flex items-center gap-1 mt-2">
          <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3 h-3 shrink-0">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[11px] font-semibold text-gray-700">{service.rating}</span>
          <span className="text-[10px] text-gray-400 ml-1">▲ {service.upvotes.toLocaleString()}</span>
        </div>
      </div>
    </article>
  )
}

/* ─── Trending card (vertical list on Home) ─────────────────── */

export function TrendingCard({ service, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  const category = getCategoryById(service.category)
  const [heartAnim, setHeartAnim] = useState(false)

  return (
    <article
      className="flex items-center gap-3 bg-white rounded-2xl p-3.5 cursor-pointer active:scale-[0.98] transition-all duration-150"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)' }}
      onClick={() => navigate(`/listings/${service.id}`)}
    >
      {/* Square thumbnail */}
      <ImageBox
        src={service.image}
        alt={service.name}
        className="w-[60px] h-[60px] rounded-xl shrink-0"
        category={category}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="font-bold text-[14px] text-gray-900 truncate">{service.name}</h3>
          {service.badge && <Badge badge={service.badge} />}
        </div>
        <p className="text-[12px] text-gray-500 line-clamp-1 mb-1.5">{service.tagline}</p>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <span className="flex items-center gap-0.5">
            <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3 h-3">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-gray-600">{service.rating}</span>
          </span>
          <span className="text-gray-200">·</span>
          <span>▲ {service.upvotes.toLocaleString()}</span>
          <span className="text-gray-200">·</span>
          <span
            className="font-semibold px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: category?.bg || '#F3F4F6', color: category?.color || '#374151' }}
          >
            {service.stage}
          </span>
        </div>
      </div>

      {/* Save */}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 active:bg-gray-100 shrink-0 transition-colors"
        onClick={(e) => { e.stopPropagation(); setHeartAnim(true); onToggleFavorite?.(service.id) }}
        aria-label="Save"
      >
        <HeartIcon filled={isFavorite} animating={heartAnim} onAnimationEnd={() => setHeartAnim(false)} />
      </button>
    </article>
  )
}
