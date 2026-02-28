export default function SearchBar({
  value,
  onChange,
  onFocus,
  placeholder = 'Search services...',
  readOnly = false,
}) {
  return (
    <div
      className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 h-12 w-full transition-shadow duration-150 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-0"
      onClick={readOnly && onFocus ? onFocus : undefined}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gray-400 shrink-0">
        <circle cx="11" cy="11" r="8" strokeLinecap="round" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
      {readOnly ? (
        <span className="text-sm text-gray-400 flex-1 select-none">{placeholder}</span>
      ) : (
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      )}
      {value && !readOnly && (
        <button
          onClick={() => onChange('')}
          className="text-gray-400 active:text-gray-600 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6M9 9l6 6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
