function Bone({ className = '' }) {
  return <div className={`bg-gray-200 rounded-lg animate-shimmer ${className}`} />
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      <Bone className="w-full h-[180px] rounded-none" />
      <div className="p-4 space-y-3">
        <Bone className="w-3/4 h-5" />
        <Bone className="w-full h-4" />
        <Bone className="w-2/3 h-4" />
        <div className="flex gap-1.5 pt-1">
          <Bone className="w-16 h-5 rounded-full" />
          <Bone className="w-20 h-5 rounded-full" />
          <Bone className="w-14 h-5 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <Bone className="w-24 h-4" />
          <Bone className="w-16 h-4" />
        </div>
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Bone className="w-14 h-14 rounded-2xl" />
      <Bone className="w-12 h-3 rounded-full" />
    </div>
  )
}

export function FeaturedCardSkeleton() {
  return (
    <div className="w-[168px] shrink-0 bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      <Bone className="w-full h-[108px] rounded-none" />
      <div className="p-3 space-y-2">
        <Bone className="w-16 h-4 rounded-full" />
        <Bone className="w-full h-4" />
        <Bone className="w-3/4 h-3" />
        <Bone className="w-1/2 h-3" />
      </div>
    </div>
  )
}

export function TrendingCardSkeleton() {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3.5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      <Bone className="w-[60px] h-[60px] rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Bone className="w-2/3 h-4" />
        <Bone className="w-full h-3" />
        <Bone className="w-1/2 h-3 rounded-full" />
      </div>
      <Bone className="w-9 h-9 rounded-full shrink-0" />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      {/* Header skeleton */}
      <div className="bg-white px-4 pt-14 pb-4 space-y-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Bone className="w-28 h-3 rounded-full" />
            <Bone className="w-40 h-6" />
          </div>
          <div className="flex gap-2">
            <Bone className="w-9 h-9 rounded-full" />
            <Bone className="w-9 h-9 rounded-full" />
          </div>
        </div>
        <Bone className="w-full h-12 rounded-2xl" />
      </div>

      {/* Carousel skeleton */}
      <Bone className="mx-4 mt-4 h-44 rounded-2xl" />

      {/* Categories */}
      <div className="px-4 mt-6 space-y-4">
        <Bone className="w-32 h-5" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
        </div>
      </div>

      {/* Featured */}
      <div className="mt-6 space-y-4">
        <div className="px-4"><Bone className="w-36 h-5" /></div>
        <div className="flex gap-3 px-4">
          {Array.from({ length: 3 }).map((_, i) => <FeaturedCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  )
}

export function ListingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => <ServiceCardSkeleton key={i} />)}
    </div>
  )
}
