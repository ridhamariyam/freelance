import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const addToast = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev.slice(-2), { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  // Graceful fallback when used outside provider (should not happen in practice)
  if (!ctx) return { addToast: () => {} }
  return ctx
}

// ─── Container ─────────────────────────────────────────────────────────────

function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div
      className="fixed top-4 left-0 right-0 z-[110] flex flex-col items-center gap-2 pointer-events-none px-4"
      style={{ maxWidth: '28rem', margin: '0 auto' }}
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  )
}

// ─── Single Toast ───────────────────────────────────────────────────────────

function Toast({ toast }) {
  const isSuccess = toast.type === 'success'

  return (
    <div
      className={`toast-in pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg text-sm font-medium w-full ${
        isSuccess
          ? 'bg-[#5B6CF6] text-white'
          : 'bg-gray-900 dark:bg-gray-800 text-white'
      }`}
    >
      <span className="flex-shrink-0 opacity-80">
        {isSuccess ? <CheckIcon /> : <InfoIcon />}
      </span>
      <span className="flex-1">{toast.message}</span>
    </div>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
