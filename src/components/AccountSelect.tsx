import { useState, useRef, useEffect, useCallback } from 'react'

export interface AccountOption {
  id: number
  accountNumber: string
  customerName: string
  balance: number
  currency: string
}

interface AccountSelectProps {
  accounts: AccountOption[]
  value: AccountOption | null
  onChange: (account: AccountOption | null) => void
  disabled?: boolean
  error?: string
  placeholder?: string
}

export default function AccountSelect({
  accounts, value, onChange, disabled, error, placeholder = 'Search account...',
}: AccountSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [focusedIdx, setFocusedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = accounts.filter((a) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      a.accountNumber.toLowerCase().includes(q) ||
      a.customerName.toLowerCase().includes(q)
    )
  })

  const formatItem = (a: AccountOption) => {
    const bal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: a.currency, minimumFractionDigits: 2 }).format(a.balance)
    return `${a.accountNumber} (${a.customerName}) - ${bal}`
  }

  const select = useCallback((a: AccountOption) => {
    onChange(a)
    setOpen(false)
    setQuery('')
  }, [onChange])

  useEffect(() => {
    if (!open) { setFocusedIdx(0); return }
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIdx((i) => Math.min(i + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIdx((i) => Math.max(i - 1, 0)) }
      if (e.key === 'Enter' && filtered[focusedIdx]) { select(filtered[focusedIdx]) }
      if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, filtered, focusedIdx, select])

  useEffect(() => {
    if (open && listRef.current && focusedIdx >= 0) {
      const el = listRef.current.children[focusedIdx] as HTMLElement | undefined
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, focusedIdx])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={open ? query : (value ? formatItem(value) : '')}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setFocusedIdx(0) }}
        onFocus={() => { setOpen(true); setQuery('') }}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } disabled:bg-gray-100`}
      />
      {open && filtered.length > 0 && (
        <div
          ref={listRef}
          className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-48 overflow-y-auto"
        >
          {filtered.map((a, i) => (
            <div
              key={a.id}
              onMouseDown={() => select(a)}
              onMouseEnter={() => setFocusedIdx(i)}
              className={`px-3 py-2 text-sm cursor-pointer ${
                i === focusedIdx ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50'
              }`}
            >
              {formatItem(a)}
            </div>
          ))}
        </div>
      )}
      {open && filtered.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg p-3 text-sm text-gray-400">
          No accounts found
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
