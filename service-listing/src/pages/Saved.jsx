import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { useFavorites } from '../hooks/useFavorites'
import ServiceCard from '../components/ServiceCard'
import { ServiceCardSkeleton } from '../components/ui/SkeletonLoader'

function EmptySaved() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth={1.5} className="w-12 h-12">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-2">No saved services yet</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
        Tap the heart icon on any service to save it here for quick access later.
      </p>
      <button
        onClick={() => navigate('/listings')}
        className="btn-primary px-6"
      >
        Explore Services
      </button>
    </div>
  )
}

export default function Saved() {
  const { data: services, isLoading } = useServices()
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()

  const savedServices = useMemo(
    () => services?.filter((s) => favoriteIds.includes(s.id)) ?? [],
    [services, favoriteIds],
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-nav animate-fade-in">
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Saved</h1>
        {!isLoading && savedServices.length > 0 && (
          <p className="text-sm text-gray-500 mt-0.5">
            {savedServices.length} service{savedServices.length !== 1 ? 's' : ''} saved
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="px-4 pt-5 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      ) : savedServices.length === 0 ? (
        <EmptySaved />
      ) : (
        <div className="px-4 pt-5 flex flex-col gap-4">
          {savedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isFavorite={isFavorite(service.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
