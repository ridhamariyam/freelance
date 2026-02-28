import { useOnlineStatus } from '../hooks/useOnlineStatus'

export default function OfflineBanner() {
  const online = useOnlineStatus()
  if (online) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] max-w-md mx-auto slide-down">
      <div className="bg-gray-900 dark:bg-gray-700 text-white flex items-center justify-center gap-2 py-2.5 px-4">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
          <path
            d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <p className="text-xs font-medium">You're offline — showing cached content</p>
      </div>
    </div>
  )
}
