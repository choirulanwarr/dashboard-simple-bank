import { useState, useMemo } from 'react'
import SearchBar from './SearchBar'
import Pagination from './Pagination'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  loading?: boolean
  pageSize?: number
  searchable?: boolean
  searchKeys?: (keyof T)[]
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  loading = false,
  pageSize = 20,
  searchable = true,
  searchKeys,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    const keys = (searchKeys ?? Object.keys(data[0] ?? {})) as string[]
    return data.filter((row) =>
      keys.some((k) => String(row[k] ?? '').toLowerCase().includes(q))
    )
  }, [data, search, searchKeys])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? '')
      const bv = String(b[sortKey] ?? '')
      const cmp = av.localeCompare(bv)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div>
      {searchable && (
        <div className="mb-3">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search..." />
        </div>
      )}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-medium text-gray-600 ${
                    col.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">
                  No data
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr
                  key={(row.id as string) ?? i}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b last:border-0 ${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row) : (row[col.key] as React.ReactNode) ?? '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
