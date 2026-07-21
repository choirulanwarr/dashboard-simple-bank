export function DateFormat({ value }: { value: string | Date }) {
  const d = typeof value === 'string' ? new Date(value) : value
  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(d)
  return <span>{formatted}</span>
}
