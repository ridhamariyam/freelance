import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ToastProvider, useToast } from './context/ToastContext'
import BottomNav from './components/BottomNav'
import InstallBanner from './components/InstallBanner'
import OfflineBanner from './components/OfflineBanner'
import SubmitModal from './components/SubmitModal'

const Home      = lazy(() => import('./pages/Home'))
const Explore   = lazy(() => import('./pages/Explore'))
const Detail    = lazy(() => import('./pages/Detail'))
const Community = lazy(() => import('./pages/Community'))
const Profile   = lazy(() => import('./pages/Profile'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="w-6 h-6 border-2 border-[#5B6CF6] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<Home />} />
        <Route path="/explore"   element={<Explore />} />
        <Route path="/item/:id"  element={<Detail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile"   element={<Profile />} />
      </Routes>
    </Suspense>
  )
}

// Shows a welcome toast once per browser session
function FirstLoadToast() {
  const { addToast } = useToast()
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    if (sessionStorage.getItem('lb_welcomed')) return

    const timer = setTimeout(() => {
      addToast({
        message: 'New startups added in AI category 🚀',
        type: 'info',
        duration: 5000,
      })
      sessionStorage.setItem('lb_welcomed', '1')
    }, 4000)

    return () => clearTimeout(timer)
  }, [addToast])

  return null
}

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <OfflineBanner />
          <FirstLoadToast />
          <div className="max-w-md mx-auto relative min-h-screen bg-gray-50 dark:bg-gray-950">
            <InstallBanner />
            <AppRoutes />
            <BottomNav />

            {/* Floating Add button */}
            <button
              onClick={() => setShowModal(true)}
              aria-label="Add listing"
              className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 w-[52px] h-[52px] bg-[#5B6CF6] text-white rounded-full shadow-lg flex items-center justify-center z-40 active:scale-95 transition-transform"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  )
}
