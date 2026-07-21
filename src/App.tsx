import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedLayout from './components/layout/ProtectedLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CustomersPage from './pages/CustomersPage'
import AuditLogsPage from './pages/AuditLogsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div className="p-6 text-gray-500">404 — Page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
