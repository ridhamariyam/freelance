export const formatRating = (r) => r.toFixed(1)

export const formatCount = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

// keep old name so any stale import still works
export const formatReviewCount = formatCount
export const formatJobsCompleted = formatCount

export const filterServices = (items, { category, search, featured }) => {
  return items.filter((s) => {
    if (category && category !== 'all' && s.category !== category) return false
    if (featured && !s.isFeatured) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        s.name.toLowerCase().includes(q) ||
        (s.tagline && s.tagline.toLowerCase().includes(q)) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        (s.maker?.name && s.maker.name.toLowerCase().includes(q))
      )
    }
    return true
  })
}

export const sortServices = (items, sortBy) => {
  const sorted = [...items]
  switch (sortBy) {
    case 'rating':  return sorted.sort((a, b) => b.rating - a.rating)
    case 'upvotes': return sorted.sort((a, b) => b.upvotes - a.upvotes)
    case 'newest':  return sorted.sort((a, b) => parseInt(b.founded) - parseInt(a.founded))
    default:
      // Recommended: featured first, then trending, then rest
      return sorted.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
        if (a.isTrending !== b.isTrending) return a.isTrending ? -1 : 1
        return 0
      })
  }
}
