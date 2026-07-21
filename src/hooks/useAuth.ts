import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const navigate = useNavigate()

  const token = localStorage.getItem('access_token')
  const isAuthenticated = !!token

  const login = useCallback((accessToken: string) => {
    localStorage.setItem('access_token', accessToken)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    navigate('/login', { replace: true })
  }, [navigate])

  return { token, isAuthenticated, login, logout }
}
