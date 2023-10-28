/* eslint-disable react/no-danger */
import { UserViewData } from '@api'
import { ReactionsWithUserNames } from '@commonTypes/channelTypes'
import { AuthContext, SocketContext } from '@context'
import { EmojiClickData } from 'emoji-picker-react'
import jwt_decode from 'jwt-decode'
import { DateTime } from 'luxon'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Avatar } from '../Avatar/Avatar.component'
import {
  Content,
  PostContainer,
  Settings,
  Text,
  TextField,
  Time,
  Username,
} from './Post.styles'
import { DotMenu } from './components/DotMenu/DotMenu.component'
import { EmojiPicker } from './components/EmojiPicker/EmojiPicker.component'
import { PostReactions } from './components/PostReactions/PostReactions.component'

interface PostProps {
  text?: string
  sended: number
  sender?: UserViewData
  isLast: boolean
  id: string
  channelId: string
  reactions: ReactionsWithUserNames
  members: Record<string, UserViewData>
}

interface DecodedProps {
  email: string
  exp: number
  iat: number
  _id: string
}

export const Post: React.FC<PostProps> = ({
  text,
  isLast,
  sender,
  sended,
  id,
  channelId,
  reactions,
  members,
}) => {
  const { accessToken } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)

  const [isEdit, setIsEdit] = useState(false)
  const [editingValue, setEditingValue] = useState(text)
  const [dotMenuOpened, setDotMenuOpened] = useState(false)
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false)
  const [postReactions, setPostReactions] = useState(reactions)

  const ref = useRef<HTMLDivElement | null>(null)

  const decoded: DecodedProps = jwt_decode(accessToken)
  const time = DateTime.fromMillis(sended).toLocaleString(DateTime.TIME_SIMPLE)

  useEffect(() => {
    if (isLast) {
      ref.current?.scrollIntoView()
    }
  }, [isLast])

  const handleMessageReactionAdded = useCallback(
    (payload: {
      messageId: string
      reaction: string
      userId: string
    }): void => {
      if (payload.messageId !== id) {
        return
      }

      setPostReactions(prev => {
        const prevCount = Number(Boolean(prev[payload.reaction]?.count))
        const prevUserNames = prev[payload.reaction]?.userNames ?? []

        return {
          ...prev,
          [payload.reaction]: {
            count: prevCount + 1,
            userNames: [...prevUserNames, members[payload.userId].username],
          },
        }
      })
    },
    [],
  )

  const handleMessageReactionRemoved = useCallback(
    (payload: {
      messageId: string
      reaction: string
      userId: string
    }): void => {
      if (payload.messageId !== id) {
        return
      }

      setPostReactions(prev => {
        if (prev[payload.reaction]?.count === 1) {
          const { [payload.reaction]: deleted, ...updatedReactions } = prev

          return updatedReactions
        }

        return {
          ...prev,
          [payload.reaction]: {
            count: prev[payload.reaction].count - 1,
            userNames: prev[payload.reaction].userNames.filter(
              (name: string) => name !== members[payload.userId].username,
            ),
          },
        }
      })
    },
    [],
  )

  const handleReactionClick = (reaction: string, own: boolean): void => {
    if (own) {
      socket.emit('remove-message-reaction', {
        messageId: id,
        reaction,
        channelId,
      })

      return
    }

    socket.emit('add-message-reaction', { messageId: id, reaction, channelId })
  }

  useEffect(() => {
    socket.on('message-reaction-added', handleMessageReactionAdded)
    socket.on('message-reaction-removed', handleMessageReactionRemoved)
  }, [handleMessageReactionAdded, handleMessageReactionRemoved])

  const handleMessageDelete = (): void => {
    socket.emit('delete-message', { messageId: id, channelId })
    setDotMenuOpened(false)
  }

  const handleMessageEdit = (): void => {
    setIsEdit(curr => !curr)
    setEditingValue(text)
    setDotMenuOpened(false)
  }

  const handleEmojiAdd = (emojiData: EmojiClickData): void => {
    socket.emit('add-message-reaction', {
      reaction: emojiData.emoji,
      messageId: id,
      channelId,
    })
    setEmojiPickerOpened(false)
  }

  const handleMessageCopy = (): void => {
    if (text) {
      navigator.clipboard.writeText(text)
    }

    setDotMenuOpened(false)
  }

  const handleEditChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditingValue(e.target.value)
  }

  const handleInputKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      socket.emit('edit-message', {
        channelId,
        text: editingValue,
        messageId: id,
      })
      setIsEdit(false)
    }

    if (e.key === 'Escape') {
      setIsEdit(false)
      setEditingValue(text)
    }
  }

  const isActive = emojiPickerOpened || dotMenuOpened

  return (
    <PostContainer isActive={isActive}>
      <Avatar username={sender?.username ?? 'U'} size={32} />
      <Content>
        <Username>
          {sender?.username ?? 'Unknown'} <Time>{time}</Time>
        </Username>
        {isEdit ? (
          <TextField
            id='outlined-basic'
            autoFocus
            variant='outlined'
            value={editingValue}
            onKeyDown={handleInputKeyPress}
            onChange={handleEditChanged}
            size='small'
          />
        ) : (
          <Text dangerouslySetInnerHTML={{ __html: text! }} ref={ref} />
        )}
        <PostReactions
          reactions={postReactions}
          onReactionClick={handleReactionClick}
        />
      </Content>

      <Settings isActive={isActive}>
        <EmojiPicker
          open={emojiPickerOpened}
          handleClose={() => setEmojiPickerOpened(false)}
          onEmojiButtonClick={() => setEmojiPickerOpened(true)}
          onEmojiClick={handleEmojiAdd}
        />
        <DotMenu
          open={dotMenuOpened}
          onDotButtonClick={() => setDotMenuOpened(true)}
          handleClose={() => setDotMenuOpened(false)}
          onMessageCopy={handleMessageCopy}
          onMessageDelete={handleMessageDelete}
          onMessageEdit={handleMessageEdit}
          ownPost={decoded._id === sender?._id}
        />
      </Settings>
    </PostContainer>
  )
}
