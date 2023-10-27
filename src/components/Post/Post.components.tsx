/* eslint-disable react/no-danger */
import { UserViewData } from '@api'
import { AuthContext, SocketContext } from '@context'
import jwt_decode from 'jwt-decode'
import { DateTime } from 'luxon'
import {
  ChangeEvent,
  KeyboardEvent,
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

interface PostProps {
  text?: string
  sended: number
  sender?: UserViewData
  isLast: boolean
  id: string
  channelId: string
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
}) => {
  const { accessToken } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)

  const [isEdit, setIsEdit] = useState(false)
  const [editingValue, setEditingValue] = useState(text)
  const [dotMenuOpened, setDotMenuOpened] = useState(false)
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const decoded: DecodedProps = jwt_decode(accessToken)
  const time = DateTime.fromMillis(sended).toLocaleString(DateTime.TIME_SIMPLE)

  useEffect(() => {
    if (isLast) {
      ref.current?.scrollIntoView()
    }
  }, [isLast])

  const handleMessageDelete = (): void => {
    socket?.emit('delete-message', { messageId: id, channelId })
    setDotMenuOpened(false)
  }

  const handleMessageEdit = (): void => {
    setIsEdit(curr => !curr)
    setEditingValue(text)
    setDotMenuOpened(false)
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
      socket?.emit('edit-message', {
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
      </Content>
      <Settings isActive={isActive}>
        <EmojiPicker
          open={emojiPickerOpened}
          handleClose={() => setEmojiPickerOpened(false)}
          onEmojiButtonClick={() => setEmojiPickerOpened(true)}
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
