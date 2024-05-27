import { Message } from '@api'
import { createContext, useCallback, useMemo, useState } from 'react'

type EditingMessage = Omit<Message, 'sender' | 'sendedDate' | 'reactions'>

interface ContextType {
  editingMessage: EditingMessage | null
  startEditMessage: (message: EditingMessage) => void
  clearEdit: () => void
}

export const EditingMessageContext = createContext<ContextType>({
  editingMessage: null,
  startEditMessage: () => {},
  clearEdit: () => {},
})

interface Props {
  children: React.ReactNode
}

export const EditingMessageProvider: React.FC<Props> = ({ children }) => {
  const [editingMessage, setEditingMessage] = useState<EditingMessage | null>(
    null,
  )

  const startEditMessage = useCallback((message: EditingMessage) => {
    setEditingMessage(message)
  }, [])

  const clearEdit = useCallback(() => {
    setEditingMessage(null)
  }, [])

  const value = useMemo(() => {
    return {
      editingMessage,
      startEditMessage,
      clearEdit,
    }
  }, [editingMessage, startEditMessage, clearEdit])

  return (
    <EditingMessageContext.Provider value={value}>
      {children}
    </EditingMessageContext.Provider>
  )
}
