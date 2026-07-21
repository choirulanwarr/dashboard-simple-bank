export function Amount({ value, currency = 'IDR' }: { value: number; currency?: string }) {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
  return <span>{formatted}</span>
}
