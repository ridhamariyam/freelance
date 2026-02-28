import { useNavigate } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'

// Deterministic fake stats per listing
function fakeStats(id) {
  let h = 5381
  for (let i = 0; i < id.length; i++) h = ((h << 5) + h) ^ id.charCodeAt(i)
  const a = Math.abs(h)
  return { views: 40 + (a % 320), clicks: 5 + (a % 48) }
}

export default function Profile() {
  const { bookmarks } = useBookmarks()
  const navigate = useNavigate()
  const { allListings, userListings, businessMode, toggleBusinessMode, dark, toggleDark } = useApp()

  const savedItems = allListings.filter((l) => bookmarks.includes(l.id))

  return (
    <main className="pb-nav page-enter">
      {/* Header */}
      <div className="px-4 pt-5 pb-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" stroke="#F59E0B" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* User card */}
      <div className="mx-4 mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 p-4 flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[#5B6CF6] to-violet-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          JD
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-white text-base">Jane Doe</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Founder & Product Builder</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">San Francisco, CA</p>
        </div>
        <button className="flex-shrink-0 w-9 h-9 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center active:bg-gray-100 dark:active:bg-gray-600 transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-3 grid grid-cols-3 gap-3">
        {[
          { label: 'Saved',    value: bookmarks.length },
          { label: 'Listings', value: userListings.length },
          { label: 'Posts',    value: 3 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 p-3 text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Business Mode toggle */}
      <div className="mx-4 mt-4">
        <button
          onClick={toggleBusinessMode}
          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-colors ${
            businessMode
              ? 'bg-[#5B6CF6] border-[#5B6CF6] text-white'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{businessMode ? '💼' : '👤'}</span>
            <div className="text-left">
              <p className="text-sm font-semibold">{businessMode ? 'Business Mode' : 'User Mode'}</p>
              <p className={`text-xs mt-0.5 ${businessMode ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}>
                {businessMode ? 'Viewing your listings & stats' : 'Switch to manage your listings'}
              </p>
            </div>
          </div>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d={businessMode ? 'M20 6L9 17l-5-5' : 'M9 18l6-6-6-6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Business Mode: My Listings */}
      {businessMode && (
        <section className="px-4 mt-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">My Listings</h2>
          {userListings.length > 0 ? (
            <div className="space-y-3">
              {/* Stats table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 overflow-hidden">
                <div className="grid grid-cols-3 text-center border-b border-gray-50 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  {['Listing', 'Views', 'Clicks'].map((h) => (
                    <p key={h} className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide py-2.5">{h}</p>
                  ))}
                </div>
                {userListings.map((item) => {
                  const { views, clicks } = fakeStats(item.id)
                  return (
                    <div key={item.id} className="grid grid-cols-3 items-center text-center border-b border-gray-50 dark:border-gray-700/50 last:border-0 px-1 py-2.5"
                      onClick={() => navigate(`/item/${item.id}`)}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate px-2 text-left">{item.name}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{views}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{clicks}</p>
                    </div>
                  )
                })}
              </div>

              {userListings.map((item, i) => (
                <Card key={item.id} item={item} index={i} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 p-6 text-center">
              <p className="text-3xl mb-3">📋</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">No listings yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Tap + to add your first listing</p>
            </div>
          )}
        </section>
      )}

      {/* Saved bookmarks */}
      {!businessMode && (
        <section className="px-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 dark:text-white">Saved</h2>
            {savedItems.length > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{savedItems.length} item{savedItems.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {savedItems.length > 0 ? (
            <div className="space-y-3">
              {savedItems.map((item, i) => <Card key={item.id} item={item} index={i} />)}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 p-6 text-center">
              <p className="text-3xl mb-3">🔖</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Nothing saved yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Bookmark listings to find them here</p>
              <button onClick={() => navigate('/explore')} className="mt-4 btn-primary">Browse listings</button>
            </div>
          )}
        </section>
      )}

      {/* Account settings */}
      {!businessMode && (
        <section className="px-4 mt-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Account</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700/60 overflow-hidden divide-y divide-gray-50 dark:divide-gray-700/50">
            {[
              { emoji: '🔔', label: 'Notifications', sub: 'Manage alerts' },
              { emoji: '⚙️', label: 'Preferences',   sub: 'Content & display' },
              { emoji: '📤', label: 'Submit a listing', sub: 'Add your startup or service' },
            ].map(({ emoji, label, sub }) => (
              <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 dark:active:bg-gray-700 transition-colors text-left">
                <span className="text-lg flex-shrink-0">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
                </div>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 text-gray-300 dark:text-gray-600">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </section>
      )}

      <p className="text-center text-xs text-gray-300 dark:text-gray-700 mt-6 mb-2">Launchbase v1.0.0</p>
    </main>
  )
}
