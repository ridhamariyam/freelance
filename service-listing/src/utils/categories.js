export const CATEGORIES = [
  { id: 'saas',      label: 'SaaS Tools',  color: '#4F46E5', bg: '#EEF2FF' },
  { id: 'startup',   label: 'Startups',    color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'funding',   label: 'Funding',     color: '#0891B2', bg: '#ECFEFF' },
  { id: 'agency',    label: 'Agencies',    color: '#D97706', bg: '#FFFBEB' },
  { id: 'resources', label: 'Resources',   color: '#059669', bg: '#ECFDF5' },
  { id: 'jobs',      label: 'Jobs',        color: '#DC2626', bg: '#FEF2F2' },
  { id: 'community', label: 'Community',   color: '#0284C7', bg: '#F0F9FF' },
  { id: 'services',  label: 'Services',    color: '#DB2777', bg: '#FDF2F8' },
]

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id)
