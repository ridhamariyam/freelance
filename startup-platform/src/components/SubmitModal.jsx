import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const TYPES = [
  { id: 'startup',  label: 'Startup',  emoji: '🚀' },
  { id: 'service',  label: 'Service',  emoji: '⚡' },
  { id: 'resource', label: 'Resource', emoji: '📄' },
]

const EMPTY = { name: '', type: 'startup', tagline: '', description: '', category: '', location: '', website: '', contact: '' }

export default function SubmitModal({ onClose }) {
  const { addListing } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [showAdvanced, setShowAdvanced] = useState(false)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name     = 'Required'
    if (!form.tagline.trim())     e.tagline  = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const item = addListing(form)
    onClose()
    navigate(`/item/${item.id}`)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

      {/* Sheet */}
      <div className="relative w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-t-3xl sheet-up max-h-[90dvh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="px-5 pb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add a listing</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-600 dark:text-gray-400" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-8 space-y-4 mt-2">
          {/* Type selector */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Type</label>
            <div className="flex gap-2 mt-2">
              {TYPES.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => set('type', id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    form.type === id
                      ? 'bg-[#5B6CF6] border-[#5B6CF6] text-white'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span>{emoji}</span> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <Field label="Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Flowboard"
              className={inputCls(errors.name)}
            />
          </Field>

          {/* Tagline */}
          <Field label="One-liner" error={errors.tagline}>
            <input
              value={form.tagline}
              onChange={(e) => set('tagline', e.target.value)}
              placeholder="What do you do in one sentence?"
              className={inputCls(errors.tagline)}
            />
          </Field>

          {/* Description */}
          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Tell us more about what you're building..."
              rows={3}
              className={inputCls(errors.description) + ' resize-none'}
            />
          </Field>

          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-sm text-[#5B6CF6] font-medium flex items-center gap-1"
          >
            <svg
              width="14" height="14" fill="none" viewBox="0 0 24 24"
              className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            >
              <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {showAdvanced ? 'Less' : 'More fields'}
          </button>

          {showAdvanced && (
            <div className="space-y-4">
              <Field label="Category">
                <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. Productivity, Fintech" className={inputCls()} />
              </Field>
              <Field label="Location">
                <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. London, UK or Remote" className={inputCls()} />
              </Field>
              <Field label="Website">
                <input type="url" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://yourdomain.com" className={inputCls()} />
              </Field>
              <Field label="Contact email">
                <input type="email" value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="hello@yourco.com" className={inputCls()} />
              </Field>
            </div>
          )}

          <button type="submit" className="btn-primary w-full mt-2 py-3.5">
            Publish listing
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  )
}

function inputCls(error) {
  return `w-full bg-gray-50 dark:bg-gray-800 border ${
    error ? 'border-rose-400' : 'border-gray-200 dark:border-gray-700'
  } rounded-xl px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-[#5B6CF6] focus:ring-2 focus:ring-[#5B6CF6]/10 transition-colors`
}
