import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from './ui/StarRating'
import { getCategoryById } from '../utils/categories'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? '#EF4444' : 'none'} stroke={filled ? '#EF4444' : '#9CA3AF'} strokeWidth={1.8} className="w-5 h-5 transition-all duration-200">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Shown when the image URL 404s — keeps card height intact
function ImageFallback({ height = 'h-48', category }) {
  return (
    <div
      className={`w-full ${height} flex items-center justify-center`}
      style={{ backgroundColor: category?.bg || '#F3F4F6' }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke={category?.color || '#9CA3AF'} strokeWidth={1.5} className="w-10 h-10 opacity-40">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function ServiceCard({ service, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  const category = getCategoryById(service.category)
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="card cursor-pointer active:scale-[0.99] transition-transform duration-150 overflow-hidden"
      onClick={() => navigate(`/listings/${service.id}`)}
    >
      {/* Image */}
      <div className="relative">
        {imgError ? (
          <ImageFallback height="h-48" category={category} />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-48 object-cover"
            onError={() => setImgError(true)}
          />
        )}

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: category?.bg || '#F3F4F6', color: category?.color || '#374151' }}
        >
          {service.categoryLabel}
        </div>

        {!service.isAvailable && (
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs font-medium">
            Unavailable
          </div>
        )}
        {service.isFeatured && service.isAvailable && (
          <div className="absolute top-3 right-3 bg-primary-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-0.5">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2.5">{service.provider.name}</p>

        <div className="flex items-center gap-3 mb-3">
          <StarRating rating={service.rating} count={service.reviewCount} />
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {service.location}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-gray-900">{service.price}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {service.responseTime}
            </div>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(service.id) }}
              aria-label={isFavorite ? 'Remove from saved' : 'Save service'}
            >
              <HeartIcon filled={isFavorite} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

// Compact card for horizontal scroll sections
export function FeaturedCard({ service, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  const category = getCategoryById(service.category)
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="card w-[200px] shrink-0 cursor-pointer active:scale-[0.99] transition-transform duration-150 overflow-hidden"
      onClick={() => navigate(`/listings/${service.id}`)}
    >
      <div className="relative">
        {imgError ? (
          <ImageFallback height="h-32" category={category} />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-32 object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm active:bg-white/95 transition-colors"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(service.id) }}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2 mb-1.5">
          {service.title}
        </p>
        <StarRating rating={service.rating} count={service.reviewCount} />
        <p className="text-[13px] font-bold text-gray-900 mt-1.5">{service.price}</p>
      </div>
    </article>
  )
}
