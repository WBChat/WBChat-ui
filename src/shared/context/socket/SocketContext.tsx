import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { AuthContext } from '../auth/AuthContext'

interface SocketContextType {
  socket: Socket
}

export const SocketContext = createContext<SocketContextType>({
  socket: {} as Socket,
})

interface SocketProviderProps {
  children?: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
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

  if (accessToken && !value.socket) {
    return null
  }

  return (
    <SocketContext.Provider value={value as SocketContextType}>
      {children}
    </SocketContext.Provider>
  )
}
