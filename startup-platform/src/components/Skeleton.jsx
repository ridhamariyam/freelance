export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Taller header to match new card height */}
      <div className="skeleton h-32 rounded-none" />
      <div className="p-4 space-y-2.5">
        <div className="skeleton h-4 w-2/3 rounded-md" />
        <div className="skeleton h-3 w-full rounded-md" />
        <div className="skeleton h-3 w-4/5 rounded-md" />
        <div className="pt-2 border-t border-gray-50 flex gap-2">
          <div className="skeleton h-3 w-20 rounded-md" />
          <div className="skeleton h-3 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function CardSkeletonList({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
