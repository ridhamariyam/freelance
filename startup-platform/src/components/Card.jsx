import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGradient, TYPE_STYLES, STAGE_STYLES } from '../utils/gradients'
import { useBookmarks } from '../hooks/useBookmarks'

export default function Card({ item, index = 0 }) {
  const navigate = useNavigate()
  const { isBookmarked, toggle } = useBookmarks()
  const [imgLoaded, setImgLoaded] = useState(false)

  const typeStyle     = TYPE_STYLES[item.type] || TYPE_STYLES.startup
  const gradientClass = getGradient(item.gradient)
  const imageUrl      = `https://picsum.photos/seed/${item.id}/800/400`
  const stagger       = Math.min(index * 55, 280)

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 overflow-hidden cursor-pointer active:scale-[0.983] transition-transform card-stagger"
      style={{ '--stagger': `${stagger}ms` }}
      onClick={() => navigate(`/item/${item.id}`)}
    >
      {/* Header: photo + gradient tint */}
      <div className="relative h-32 overflow-hidden">
        <div className={`absolute inset-0 ${gradientClass}`} />
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className={`absolute inset-0 ${gradientClass} opacity-60`} />

        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="text-xl leading-none drop-shadow">{item.emoji}</span>
          <div className="flex gap-1.5">
            <span className={`chip ${typeStyle.bg} ${typeStyle.text}`}>{typeStyle.label}</span>
            {item.stage && (
              <span className={`chip ${STAGE_STYLES[item.stage]?.bg || 'bg-white/20'} ${STAGE_STYLES[item.stage]?.text || 'text-white'}`}>
                {item.stage}
              </span>
            )}
          </div>
        </div>

        {/* Bookmark */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 active:bg-black/35 transition-colors"
          onClick={(e) => { e.stopPropagation(); toggle(item.id) }}
          aria-label="Bookmark"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path
              d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"
              stroke="white" strokeWidth="2"
              fill={isBookmarked(item.id) ? 'white' : 'none'}
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* User-submitted badge */}
        {item.isUserSubmitted && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/90 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5">
            Your listing
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] leading-tight">{item.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed line-clamp-2">{item.tagline}</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-700/50">
          <div className="flex items-center gap-2 flex-wrap">
            {item.location && (
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 13 6 13s6-8.582 6-13c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
                {item.location}
              </span>
            )}
            {item.category && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{item.category}</span>
            )}
          </div>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 text-gray-300 dark:text-gray-600">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </article>
  )
}
