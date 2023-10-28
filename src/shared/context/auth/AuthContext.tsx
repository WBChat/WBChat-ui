import { OpenAPI } from '@api'
import { CHECK_TOKEN_ITERVAL } from '@constants'
import jwt_decode from 'jwt-decode'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

interface ContextType {
  isAuth: boolean
  accessToken: string
  refreshToken: string
  userId: string | null
  authenticate: (a: string, r: string) => void
  logout: () => void
}

export const AuthContext = createContext<ContextType>({
  isAuth: false,
  accessToken: '',
  refreshToken: '',
  userId: null,
  authenticate: () => {},
  logout: () => {},
})

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'))
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
    if (!accessToken) {
      return
    }

    const checkToken = setInterval(() => {
      const decoded: { exp: number } = jwt_decode(accessToken)

      if (decoded.exp < Date.now() / 1000) {
        logout()
      }
    }, CHECK_TOKEN_ITERVAL)

    return () => {
      clearInterval(checkToken)
    }
  }, [accessToken])

  OpenAPI.TOKEN = accessToken

  const logout = useCallback(() => {
    setIsAuth(false)
    setAccessToken('')
    setRefreshToken('')

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    OpenAPI.TOKEN = undefined
  }, [])

  const value = useMemo(() => {
    return {
      isAuth,
      accessToken,
      refreshToken,
      authenticate,
      logout,
      userId: accessToken ? jwt_decode<{ _id: string }>(accessToken)._id : null,
    }
  }, [isAuth, accessToken, refreshToken, authenticate, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
