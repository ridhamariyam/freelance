import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  {
    to: '/',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 12L12 3l9 9"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? 'var(--nav-fill)' : 'none'}
        />
      </svg>
    ),
  },
  {
    to: '/explore',
    label: 'Explore',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          fill={active ? 'var(--nav-fill)' : 'none'}
        />
        <path
          d="M20 20l-3-3"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: '/community',
    label: 'Community',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle
          cx="9"
          cy="8"
          r="3"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          fill={active ? 'var(--nav-fill)' : 'none'}
        />
        <path
          d="M3 19c0-3.314 2.686-6 6-6s6 2.686 6 6"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M16 6c1.657 0 3 1.343 3 3s-1.343 3-3 3"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M21 19c0-2.761-2.239-5-5-5"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          fill={active ? 'var(--nav-fill)' : 'none'}
        />
        <path
          d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
          stroke={active ? '#5B6CF6' : '#94A3B8'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex">
        {tabs.map(({ to, label, icon }) => {
          const active =
            to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(to)

          return (
            <NavLink
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-opacity active:opacity-70"
            >
              {icon(active)}
              <span
                className={`text-[10px] font-medium tracking-wide transition-colors ${
                  active ? 'text-[#5B6CF6]' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
