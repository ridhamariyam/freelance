import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useServiceById } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import StarRating from '../components/ui/StarRating'
import { getCategoryById } from '../utils/categories'
import { formatJobsCompleted } from '../utils/helpers'

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
        <Bone className="w-1/2 h-4" />
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
        <Bone className="w-full h-20 rounded-2xl" />
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
        <h2 className="text-lg font-semibold text-gray-900">Service not found</h2>
        <button onClick={() => navigate('/listings')} className="btn-primary">
          Back to Listings
        </button>
      </div>
    )
  }

  const category = getCategoryById(service.category)
  const whatsappMsg = encodeURIComponent(`Hi, I'd like to book "${service.title}" from Serviq.`)

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
            alt={service.title}
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
        {/* Category + availability */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: category?.bg || '#F3F4F6', color: category?.color || '#374151' }}
          >
            {service.categoryLabel}
          </span>
          {service.isAvailable ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Available Now
            </span>
          ) : (
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              Unavailable
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-2">
          {service.title}
        </h1>

        {/* Rating + location row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
          <StarRating rating={service.rating} count={service.reviewCount} size="md" />
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {service.location}
          </div>
        </div>

        {/* Price + response */}
        <div className="flex items-center gap-3 mb-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium mb-0.5">Starting price</p>
            <p className="text-2xl font-bold text-gray-900">{service.price}</p>
          </div>
          <div className="h-12 w-px bg-gray-200" />
          <div className="flex-1 text-right">
            <p className="text-xs text-gray-400 font-medium mb-0.5">Response time</p>
            <p className="text-base font-bold text-primary-600">{service.responseTime}</p>
          </div>
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
        <h2 className="text-base font-semibold text-gray-900 mb-2.5">About this service</h2>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-6">{service.description}</p>

        {/* Availability */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-primary-600">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900">{service.availability}</p>
            <p className="text-xs text-gray-500 mt-0.5">Working hours</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-6" />

        {/* Provider card */}
        <h2 className="text-base font-semibold text-gray-900 mb-3">About the provider</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          {avatarError ? (
            <div className="w-14 h-14 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl shrink-0">
              {service.provider.name[0]}
            </div>
          ) : (
            <img
              src={service.provider.avatar}
              alt={service.provider.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
              onError={() => setAvatarError(true)}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <p className="font-semibold text-gray-900 text-[15px] truncate">{service.provider.name}</p>
              <svg viewBox="0 0 20 20" fill="#4F46E5" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-0.5">
                <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-3.5 h-3.5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {service.provider.rating}
              </span>
              <span className="text-gray-300">·</span>
              <span>{formatJobsCompleted(service.provider.jobsCompleted)} jobs</span>
              <span className="text-gray-300">·</span>
              <span>Since {service.provider.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Bottom padding for CTA */}
        <div className="h-4" />
      </div>

      {/* ── Sticky Bottom CTA ── */}
      <div
        className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3 z-50"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
      >
        <div className="flex gap-3">
          <a
            href={`tel:${service.phone}`}
            className="btn-secondary flex-[1] h-12 text-[15px]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 5.55 5.55l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Call
          </a>
          <a
            href={`https://wa.me/${service.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[2] h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-[15px] text-white transition-all duration-150 active:scale-[0.98] select-none"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
