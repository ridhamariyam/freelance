import { useNavigate } from 'react-router-dom'

// Icon paths keyed by category id
const ICONS = {
  ac: (
    <>
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  cleaning: (
    <>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  electrical: (
    <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  plumbing: (
    <>
      <path d="M12 22a8 8 0 0 1-8-8c0-3.5 2-6.5 5-8l1 3 2-5 2 5 1-3c3 1.5 5 4.5 5 8a8 8 0 0 1-8 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  automotive: (
    <>
      <rect x="1" y="8" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  beauty: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </>
  ),
  moving: (
    <>
      <rect x="1" y="6" width="15" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M16 9h4l3 3v5h-7V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="5.5" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="18.5" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  security: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  gardening: (
    <>
      <path d="M12 22V12M12 12C12 7 8 4 4 5c1 4 4 7 8 7zM12 12C12 7 16 4 20 5c-1 4-4 7-8 7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M6 22h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  handyman: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  wellness: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  laundry: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="13" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="6" y1="7" x2="6.01" y2="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
}

export default function CategoryCard({ id, label, color, bg }) {
  const navigate = useNavigate()

  return (
    <button
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-150 select-none"
      onClick={() => navigate(`/listings?category=${id}`)}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" style={{ color }}>
          {ICONS[id] || (
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </div>
      <span className="text-[11px] font-medium text-gray-600 text-center leading-tight w-16">
        {label}
      </span>
    </button>
  )
}
