import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { OpenAPI } from '../../api'

interface ContextType {
  isAuth: boolean
  accessToken: string
  refreshToken: string
  authenticate: (a: string, r: string) => void
  logout: () => void
}

export const AuthContext = createContext<ContextType>({
  isAuth: false,
  accessToken: '',
  refreshToken: '',
  authenticate: () => {},
  logout: () => {},
})

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true)
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') ?? '',
  )
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token') ?? '',
  )

  const authenticate = useCallback((access: string, refresh: string) => {
    setIsAuth(true)
    setAccessToken(access)
    setRefreshToken(refresh)

    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  }, [])

  useEffect(() => {
    OpenAPI.TOKEN = accessToken
  }, [accessToken])

  const logout = useCallback(() => {
    setIsAuth(false)
    setAccessToken('')
    setRefreshToken('')

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }, [])

  const value = useMemo(() => {
    return { isAuth, accessToken, refreshToken, authenticate, logout }
  }, [isAuth, accessToken, refreshToken, authenticate, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
