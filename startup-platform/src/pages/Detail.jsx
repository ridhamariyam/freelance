import { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGradient, TYPE_STYLES, STAGE_STYLES } from '../utils/gradients'
import { useBookmarks } from '../hooks/useBookmarks'
import { useApp } from '../context/AppContext'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'

// Deterministic fake analytics from item ID
function getAnalytics(id) {
  let h = 5381
  for (let i = 0; i < id.length; i++) h = ((h << 5) + h) ^ id.charCodeAt(i)
  const abs = Math.abs(h)
  return {
    views:      124 + (abs % 876),
    interested: 8   + (abs % 67),
    saved:      2   + (abs % 28),
  }
}

function MetaItem({ icon, label }) {
  if (!label) return null
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400">{icon}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  )
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isBookmarked, toggle } = useBookmarks()
  const { allListings } = useApp()
  const { track } = useRecentlyViewed()
  const imgRef    = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [shared, setShared]       = useState(false)

  const item = allListings.find((l) => l.id === id)

  // Track this view
  useEffect(() => { if (item) track(item.id) }, [item?.id])

  // Parallax on scroll
  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.38}px) scale(1.12)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [item])

  if (!item) {
    return (
      <main className="pb-nav page-enter flex flex-col items-center justify-center min-h-screen gap-3">
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-1">
          <p className="text-2xl">😕</p>
        </div>
        <p className="font-semibold text-gray-700 dark:text-gray-300">Listing not found</p>
        <button className="btn-ghost" onClick={() => navigate(-1)}>Go back</button>
      </main>
    )
  }

  const typeStyle     = TYPE_STYLES[item.type] || TYPE_STYLES.startup
  const stageStyle    = item.stage ? STAGE_STYLES[item.stage] : null
  const gradientClass = getGradient(item.gradient)
  const bookmarked    = isBookmarked(item.id)
  const imageUrl      = `https://picsum.photos/seed/${item.id}/800/500`
  const analytics     = getAnalytics(item.id)
  const paragraphs    = item.description.split('\n\n').filter(Boolean)

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: item.name, text: item.tagline, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch { /* user cancelled */ }
  }

  return (
    <main className="pb-nav page-enter">
      {/* Hero with parallax */}
      <div className="relative h-60 overflow-hidden">
        <div className={`absolute inset-0 ${gradientClass}`} />
        <img
          ref={imgRef}
          src={imageUrl}
          alt={item.name}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transformOrigin: 'center top', willChange: 'transform' }}
        />
        <div className={`absolute inset-0 ${gradientClass} opacity-60`} />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-xl bg-black/25 backdrop-blur-sm active:bg-black/40 transition-colors"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => toggle(item.id)}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl bg-black/25 backdrop-blur-sm active:bg-black/40 transition-colors"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"
              stroke="white" strokeWidth="1.8"
              fill={bookmarked ? 'white' : 'none'}
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Emoji badge */}
        <div className="absolute bottom-4 left-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            {item.emoji}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-3">
          <span className={`chip ${typeStyle.bg} ${typeStyle.text} fade-scale-in`} style={{ '--stagger': '0ms' }}>{typeStyle.label}</span>
          {item.stage && stageStyle && (
            <span className={`chip ${stageStyle.bg} ${stageStyle.text} fade-scale-in`} style={{ '--stagger': '60ms' }}>{item.stage}</span>
          )}
          {item.category && (
            <span className="chip bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 fade-scale-in" style={{ '--stagger': '120ms' }}>{item.category}</span>
          )}
          {item.isUserSubmitted && (
            <span className="chip bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Your listing</span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-base leading-relaxed">{item.tagline}</p>

        {/* Fake analytics strip */}
        <div className="flex gap-0 mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {[
            { label: 'Views',      value: analytics.views.toLocaleString() },
            { label: 'Interested', value: analytics.interested },
            { label: 'Saved',      value: analytics.saved },
          ].map(({ label, value }, i, arr) => (
            <div key={label} className={`flex-1 px-3 py-3 text-center ${i < arr.length - 1 ? 'border-r border-gray-100 dark:border-gray-700' : ''}`}>
              <p className="text-base font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2 mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <MetaItem
            icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 13 6 13s6-8.582 6-13c0-3.314-2.686-6-6-6z" stroke="#94A3B8" strokeWidth="2"/><circle cx="12" cy="8" r="2" stroke="#94A3B8" strokeWidth="2"/></svg>}
            label={item.location}
          />
          <MetaItem
            icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#94A3B8" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>}
            label={item.founded ? `Founded ${item.founded}` : null}
          />
          {item.contact && (
            <MetaItem
              icon={<svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="#94A3B8" strokeWidth="2"/><path d="M22 7l-10 7L2 7" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>}
              label={item.contact}
            />
          )}
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

        {/* Description */}
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{p}</p>
          ))}
        </div>

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map((tag) => (
              <span key={tag} className="chip bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">#{tag}</span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          {item.website && (
            <a href={item.website} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-center">
              Visit Website
            </a>
          )}
          <button onClick={() => toggle(item.id)} className="btn-ghost flex items-center gap-2">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.8" fill={bookmarked ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={handleShare}
            className={`btn-ghost flex items-center gap-2 transition-colors ${shared ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
          >
            {shared ? (
              <>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                Copied
              </>
            ) : (
              <>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Share
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}
