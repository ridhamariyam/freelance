import { useState, useEffect } from 'react'

export default function InstallBanner() {
  const [prompt, setPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem('lb_install_dismissed') === '1'
  )

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!prompt || dismissed) return null

  const install = async () => {
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setPrompt(null)
  }

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem('lb_install_dismissed', '1')
  }

  return (
    <div className="mx-4 mt-3 bg-[#5B6CF6] rounded-2xl p-4 flex items-center gap-3 shadow-card slide-down">
      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 3v13M8 13l4 4 4-4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 19h14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">Add to Home Screen</p>
        <p className="text-white/70 text-xs mt-0.5">Get the full app experience</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={install}
          className="bg-white text-[#5B6CF6] text-xs font-semibold rounded-lg px-3 py-1.5 active:bg-white/90 transition-colors"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          className="text-white/60 active:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
