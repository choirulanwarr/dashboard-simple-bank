import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { logout } = useAuth()

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <span className="text-sm text-gray-500">Dashboard</span>
      <button
        onClick={logout}
        className="text-sm text-red-600 hover:text-red-800 transition"
      >
        Logout
      </button>
    </header>
  )
}
