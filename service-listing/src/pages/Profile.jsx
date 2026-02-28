import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

const MENU_SECTIONS = [
  {
    label: 'Account',
    items: [
      {
        icon: (
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round" />
        ),
        label: 'Edit Profile',
        sub: 'Update your name and details',
        color: '#4F46E5',
        bg: '#EEF2FF',
      },
      {
        icon: (
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
        ),
        label: 'Notifications',
        sub: 'Manage your alerts',
        color: '#F97316',
        bg: '#FFF7ED',
      },
      {
        icon: (
          <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" /></>
        ),
        label: 'Privacy & Security',
        sub: 'Control your data',
        color: '#22C55E',
        bg: '#F0FDF4',
      },
    ],
  },
  {
    label: 'Preferences',
    items: [
      {
        icon: (
          <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round" /></>
        ),
        label: 'Settings',
        sub: 'App preferences',
        color: '#64748B',
        bg: '#F8FAFC',
      },
      {
        icon: (
          <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round" /></>
        ),
        label: 'Help & Support',
        sub: 'Get answers to your questions',
        color: '#0EA5E9',
        bg: '#F0F9FF',
      },
    ],
  },
]

function MenuRow({ item }) {
  return (
    <button className="flex items-center gap-4 w-full active:bg-gray-50 transition-colors px-0">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: item.bg }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth={1.8} className="w-5 h-5">
          {item.icon}
        </svg>
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[14px] font-semibold text-gray-900">{item.label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-300 shrink-0">
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const { favoriteIds } = useFavorites()

  return (
    <div className="min-h-screen bg-gray-50 pb-nav animate-fade-in">
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-5">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight mb-5">Profile</h1>

        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold w-[72px] h-[72px]">
              A
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Ahmed Al-Rashid</h2>
            <p className="text-sm text-gray-500">ahmed.alrashid@email.com</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-primary-600">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              Doha, Qatar
            </div>
          </div>
          <button
            onClick={() => {}}
            className="ml-auto text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-xl active:bg-primary-100 transition-colors"
          >
            Edit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-100">
          {[
            { value: '12', label: 'Bookings' },
            { value: `${favoriteIds.length}`, label: 'Saved' },
            { value: '4', label: 'Reviews' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking History ── */}
      <div className="mx-4 mt-4 card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-gray-900">Recent Booking</h3>
          <span className="text-xs text-primary-600 font-medium">View all</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth={1.8} className="w-6 h-6">
              <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Electrician Services</p>
            <p className="text-xs text-gray-500 mt-0.5">PowerPro Electric · Feb 20, 2026</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            Done
          </span>
        </div>
      </div>

      {/* ── Menu sections ── */}
      {MENU_SECTIONS.map((section) => (
        <div key={section.label} className="mx-4 mt-4 card px-4 py-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {section.label}
          </p>
          <div className="divide-y divide-gray-100 space-y-0">
            {section.items.map((item, idx) => (
              <div key={item.label} className={idx > 0 ? 'pt-3 mt-3' : ''}>
                <MenuRow item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Logout ── */}
      <div className="mx-4 mt-4 mb-2">
        <button className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold text-sm bg-red-50 active:bg-red-100 transition-colors rounded-2xl py-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign Out
        </button>
      </div>

      {/* Version */}
      <p className="text-center text-xs text-gray-400 pb-4 mt-2">Serviq v1.0.0</p>
    </div>
  )
}
