import { useNavigate } from 'react-router-dom'

export default function Header({ title, subtitle, showBack = false, action }) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center gap-3 px-4 pt-4 pb-2">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-card dark:shadow-none dark:border dark:border-gray-700 flex-shrink-0 active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300" />
          </svg>
        </button>
      )}

      <div className="flex-1 min-w-0">
        <h1 className="font-bold text-gray-900 dark:text-white text-lg leading-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </header>
  )
}
