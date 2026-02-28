function Bone({ className = '' }) {
  return (
    <div className={`bg-gray-200 rounded-lg animate-shimmer ${className}`} />
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Bone className="w-full h-48 rounded-none rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <Bone className="w-20 h-4 rounded-full" />
        <Bone className="w-full h-5" />
        <Bone className="w-2/3 h-4" />
        <div className="flex items-center gap-2">
          <Bone className="w-24 h-4 rounded-full" />
          <Bone className="w-16 h-4 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Bone className="w-28 h-5" />
          <Bone className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 w-20">
      <Bone className="w-16 h-16 rounded-2xl" />
      <Bone className="w-14 h-3 rounded-full" />
    </div>
  )
}

export function FeaturedCardSkeleton() {
  return (
    <div className="card w-44 shrink-0">
      <Bone className="w-full h-28 rounded-none rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <Bone className="w-full h-4" />
        <Bone className="w-2/3 h-3 rounded-full" />
        <Bone className="w-full h-4" />
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 pb-nav">
      <div className="bg-white px-4 pt-14 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Bone className="w-24 h-3 rounded-full" />
            <Bone className="w-40 h-6" />
          </div>
          <Bone className="w-10 h-10 rounded-full" />
        </div>
        <Bone className="w-full h-12 rounded-2xl" />
      </div>

      <div className="px-4 pt-6 space-y-4">
        <Bone className="w-28 h-5" />
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>

        <Bone className="w-24 h-5 mt-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ListingSkeleton() {
  return (
    <div className="px-4 space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  )
}
