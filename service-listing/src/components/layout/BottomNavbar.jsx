import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.8} className="w-6 h-6">
        <path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} />
        <path fillRule="evenodd" d="M2.879 11.879a3 3 0 0 1 0-4.243l7.5-7.5a3 3 0 0 1 4.243 0l7.5 7.5A3 3 0 0 1 21 10.257V19a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H10v5a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-8.743a3 3 0 0 1 .879-2.378z" fill={active ? 'currentColor' : 'none'} stroke="none" />
      </svg>
    ),
    exact: true,
  },
  {
    to: '/listings',
    label: 'Explore',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="11" cy="11" r="8" strokeLinecap="round" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        {active && <circle cx="11" cy="11" r="3" fill="currentColor" stroke="none" />}
      </svg>
    ),
  },
  {
    to: '/saved',
    label: 'Saved',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="8" r="4" fill={active ? 'currentColor' : 'none'} strokeLinecap="round" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function BottomNavbar() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 inset-x-0 bg-white shadow-nav z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-[60px]">
        {navItems.map(({ to, label, icon, exact }) => {
          const active = exact
            ? location.pathname === to
            : location.pathname.startsWith(to)

          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 min-w-[60px] transition-colors duration-150 ${
                active ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              {icon(active)}
              <span
                className={`text-[10px] font-medium tracking-wide leading-none ${
                  active ? 'text-primary-600' : 'text-gray-400'
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
