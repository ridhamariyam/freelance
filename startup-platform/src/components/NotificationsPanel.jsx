import { useEffect } from 'react'
import { useToast } from '../context/ToastContext'

export default function NotificationsPanel({
  notifications,
  readIds,
  unreadCount,
  markRead,
  markAllRead,
  onClose,
}) {
  const { addToast } = useToast()

  // Lock body scroll while panel is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const requestBrowserNotification = async () => {
    if (!('Notification' in window)) {
      addToast({ message: "Push notifications aren't supported on this device." })
      return
    }
    if (Notification.permission === 'granted') {
      new Notification('Launchbase', {
        body: 'Notifications are already enabled!',
        icon: '/icons/icon-192.png',
      })
      return
    }
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      new Notification('Launchbase', {
        body: 'You'll now get notified about new startups and updates.',
        icon: '/icons/icon-192.png',
      })
      addToast({ message: 'Push notifications enabled!', type: 'success' })
    } else {
      addToast({ message: 'Notifications blocked. You can enable them in browser settings.' })
    }
  }

  const testToast = () => {
    addToast({ message: 'New startups added in AI category 🚀', type: 'info', duration: 5000 })
  }

  return (
    <div className="fixed inset-0 z-[80] flex flex-col justify-end" style={{ maxWidth: '28rem', margin: '0 auto' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white dark:bg-gray-900 rounded-t-3xl sheet-up flex flex-col max-h-[85vh]">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-9 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-lg">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-[#5B6CF6] active:opacity-60 transition-opacity"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors ml-1"
              aria-label="Close notifications"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="text-gray-600 dark:text-gray-300"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="overflow-y-auto flex-1">
          {notifications.map((n, i) => {
            const isRead = readIds.has(n.id)
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`w-full flex items-start gap-3.5 px-5 py-4 text-left transition-colors active:bg-gray-50 dark:active:bg-gray-800/60 ${
                  i < notifications.length - 1
                    ? 'border-b border-gray-100 dark:border-gray-800'
                    : ''
                } ${
                  isRead
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-[#EEF0FE]/60 dark:bg-[#5B6CF6]/[0.08]'
                }`}
              >
                {/* Emoji icon */}
                <div className="w-10 h-10 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-lg leading-none">
                  {n.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm leading-snug ${
                        isRead
                          ? 'text-gray-600 dark:text-gray-400 font-normal'
                          : 'text-gray-900 dark:text-white font-semibold'
                      }`}
                    >
                      {n.title}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                      <span className="text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
                        {n.time}
                      </span>
                      {!isRead && (
                        <div className="w-2 h-2 bg-[#5B6CF6] rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {n.body}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer actions */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-2.5">
          <button
            onClick={testToast}
            className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl active:bg-gray-200 dark:active:bg-gray-700 transition-colors"
          >
            Test notification
          </button>
          <button
            onClick={requestBrowserNotification}
            className="flex-1 py-2.5 bg-[#EEF0FE] dark:bg-[#5B6CF6]/20 text-[#5B6CF6] text-sm font-semibold rounded-xl active:opacity-70 transition-opacity"
          >
            Enable push
          </button>
        </div>

        {/* iOS safe area spacer */}
        <div className="safe-bottom flex-shrink-0" />
      </div>
    </div>
  )
}
