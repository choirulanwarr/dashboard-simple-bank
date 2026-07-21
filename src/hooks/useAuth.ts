import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const navigate = useNavigate()

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    navigate('/login', { replace: true })
  }, [navigate])

  const isAuthenticated = !!localStorage.getItem('access_token')

  return { isAuthenticated, logout }
}
