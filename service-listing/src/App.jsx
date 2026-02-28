import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import BottomNavbar from './components/layout/BottomNavbar'
import OfflineBanner from './components/ui/OfflineBanner'
import { PageLoader } from './components/ui/SkeletonLoader'

const Home = lazy(() => import('./pages/Home'))
const Listings = lazy(() => import('./pages/Listings'))
const Detail = lazy(() => import('./pages/Detail'))
const Saved = lazy(() => import('./pages/Saved'))
const Profile = lazy(() => import('./pages/Profile'))

function AnimatedRoutes() {
  const location = useLocation()
  const showNav = !location.pathname.startsWith('/listings/')

  return (
    <>
      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<Detail />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {showNav && <BottomNavbar />}
    </>
  )
}

export default function App() {
  return (
    <div className="bg-gray-50">
      <OfflineBanner />
      <AnimatedRoutes />
    </div>
  )
}
