// All gradient classes must be written in full so Tailwind can detect them statically
export const GRADIENTS = {
  indigo:       'bg-gradient-to-br from-indigo-500 to-violet-600',
  emerald:      'bg-gradient-to-br from-emerald-500 to-teal-600',
  rose:         'bg-gradient-to-br from-rose-400 to-pink-600',
  blue:         'bg-gradient-to-br from-blue-500 to-cyan-600',
  orange:       'bg-gradient-to-br from-orange-400 to-amber-600',
  fuchsia:      'bg-gradient-to-br from-fuchsia-500 to-purple-600',
  pink:         'bg-gradient-to-br from-pink-500 to-rose-600',
  violet:       'bg-gradient-to-br from-violet-500 to-indigo-600',
  cyan:         'bg-gradient-to-br from-cyan-500 to-blue-600',
  teal:         'bg-gradient-to-br from-teal-500 to-green-600',
  yellow:       'bg-gradient-to-br from-yellow-400 to-orange-500',
  'emerald-cyan': 'bg-gradient-to-br from-emerald-400 to-cyan-600',
  'indigo-blue':  'bg-gradient-to-br from-indigo-400 to-blue-600',
  'orange-red':   'bg-gradient-to-br from-orange-400 to-red-500',
  'gray-dark':    'bg-gradient-to-br from-gray-600 to-gray-800',
  'purple-dark':  'bg-gradient-to-br from-violet-500 to-purple-700',
  'blue-indigo':  'bg-gradient-to-br from-blue-500 to-indigo-700',
  'pink-rose':    'bg-gradient-to-br from-pink-400 to-rose-600',
}

export function getGradient(key) {
  return GRADIENTS[key] || GRADIENTS.indigo
}

export const TYPE_STYLES = {
  startup:  { label: 'Startup',  bg: 'bg-[#EEF0FE] dark:bg-indigo-900/40',  text: 'text-[#5B6CF6] dark:text-indigo-400'  },
  service:  { label: 'Service',  bg: 'bg-emerald-50 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-400' },
  resource: { label: 'Resource', bg: 'bg-amber-50 dark:bg-amber-900/40',     text: 'text-amber-700 dark:text-amber-400'    },
}

export const STAGE_STYLES = {
  'Pre-seed': { bg: 'bg-gray-100 dark:bg-gray-700',    text: 'text-gray-600 dark:text-gray-300'   },
  'Seed':     { bg: 'bg-blue-50 dark:bg-blue-900/40',  text: 'text-blue-700 dark:text-blue-400'   },
  'Series A': { bg: 'bg-purple-50 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-400' },
  'Series B': { bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/40', text: 'text-fuchsia-700 dark:text-fuchsia-400' },
}
