import { type ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  message: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <p className="text-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
