export const CATEGORIES = [
  { id: 'ac',         label: 'AC & Cooling',   color: '#0EA5E9', bg: '#F0F9FF'  },
  { id: 'cleaning',   label: 'Cleaning',        color: '#3B82F6', bg: '#EFF6FF'  },
  { id: 'electrical', label: 'Electrical',       color: '#EAB308', bg: '#FEFCE8'  },
  { id: 'plumbing',   label: 'Plumbing',         color: '#6366F1', bg: '#EEF2FF'  },
  { id: 'automotive', label: 'Car Services',     color: '#F97316', bg: '#FFF7ED'  },
  { id: 'beauty',     label: 'Beauty',           color: '#EC4899', bg: '#FDF2F8'  },
  { id: 'moving',     label: 'Moving',           color: '#8B5CF6', bg: '#F5F3FF'  },
  { id: 'security',   label: 'Security',         color: '#475569', bg: '#F8FAFC'  },
  { id: 'gardening',  label: 'Gardening',        color: '#22C55E', bg: '#F0FDF4'  },
  { id: 'handyman',   label: 'Handyman',         color: '#D97706', bg: '#FFFBEB'  },
  { id: 'wellness',   label: 'Wellness',         color: '#14B8A6', bg: '#F0FDFA'  },
  { id: 'laundry',    label: 'Laundry',          color: '#64748B', bg: '#F8FAFC'  },
]

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id)
