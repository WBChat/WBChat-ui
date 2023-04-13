import { OpenAPI } from '@api'
import { createContext, useEffect, useMemo, useState } from 'react'
import { Socket, io } from 'socket.io-client'

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
  const value = useMemo(() => {
    return { socket }
  }, [socket])

  useEffect(() => {
    if (!OpenAPI.TOKEN) {
      return
    }

    setSocket(
      io(process.env.REACT_APP_SOCKET_URL!, {
        extraHeaders: {
          Authorization: `Bearer ${OpenAPI.TOKEN}`,
        },
      }),
    )
  }, [OpenAPI.TOKEN])

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
