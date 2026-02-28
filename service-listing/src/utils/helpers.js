export const formatRating = (rating) => rating.toFixed(1)

export const formatReviewCount = (count) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

export const formatJobsCompleted = (count) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k+`
  return `${count}+`
}

export const filterServices = (services, { category, search, featured }) => {
  return services.filter((s) => {
    if (category && category !== 'all' && s.category !== category) return false
    if (featured && !s.isFeatured) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        s.title.toLowerCase().includes(q) ||
        s.provider.name.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return true
  })
}

export const sortServices = (services, sortBy) => {
  const sorted = [...services]
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'price':
      return sorted.sort((a, b) => a.priceValue - b.priceValue)
    case 'reviews':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    default:
      return sorted
  }
}
