import { type ReactNode } from 'react'

interface StatCardProps {
  icon?: ReactNode
  label: string
  value: string
  trend?: 'up' | 'down'
}

export default function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center gap-4">
      {icon && <div className="text-2xl">{icon}</div>}
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      {trend && (
        <span className={`text-lg ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
  )
}
