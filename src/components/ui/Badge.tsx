interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'neutral'
  children: string
}

const variantClass = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  neutral: 'bg-gray-100 text-gray-800',
}

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${variantClass[variant]}`}
    >
      {children}
    </span>
  )
}
