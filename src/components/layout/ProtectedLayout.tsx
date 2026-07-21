import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function ProtectedLayout() {
  const token = localStorage.getItem('access_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
