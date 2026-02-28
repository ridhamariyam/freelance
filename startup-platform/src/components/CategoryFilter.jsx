export const CATEGORIES = [
  { id: 'all',      label: 'All' },
  { id: 'startup',  label: 'Startups' },
  { id: 'service',  label: 'Services' },
  { id: 'resource', label: 'Resources' },
]

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 -mx-4">
      {CATEGORIES.map(({ id, label }) => {
        const active = selected === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-shrink-0 text-sm font-medium rounded-full px-4 py-2 transition-all duration-200 ${
              active
                ? 'bg-[#5B6CF6] text-white shadow-sm scale-[1.04]'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 active:scale-[0.97]'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
