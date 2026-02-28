import { useState } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import NotificationsPanel from './NotificationsPanel'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  // State lives here so bell badge + panel stay in sync
  const notifState = useNotifications()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
        aria-label={`Notifications${notifState.unreadCount > 0 ? `, ${notifState.unreadCount} unread` : ''}`}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 dark:text-gray-300"
          />
        </svg>

        {notifState.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center px-1">
            <span className="text-[10px] font-bold text-white leading-none">
              {notifState.unreadCount > 9 ? '9+' : notifState.unreadCount}
            </span>
          </span>
        )}
      </button>

      {open && (
        <NotificationsPanel
          {...notifState}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
