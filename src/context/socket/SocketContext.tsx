import { OpenAPI } from '@api'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { AuthContext } from '../auth/AuthContext'

interface SocketContextType {
  socket: null | Socket
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
})

interface SocketProviderProps {
  children?: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<null | Socket>(null)
  const { accessToken } = useContext(AuthContext)
  const value = useMemo(() => {
    return { socket }
  }, [socket])

  useEffect(() => {
    if (!accessToken) {
      return
    }

    setSocket(
      io(process.env.REACT_APP_SOCKET_URL!, {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    )
  }, [accessToken])

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
