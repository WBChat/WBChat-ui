/* eslint-disable react/no-danger */
import { UserViewData } from '@api'
import { AuthContext, SocketContext } from '@context'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import jwt_decode from 'jwt-decode'
import { DateTime } from 'luxon'
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import { Avatar } from '../Avatar/Avatar.component'
import {
  Content,
  PostContainer,
  Settings,
  Text,
  Time,
  Username,
  TextField
} from './Post.styles'


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

export const Post: React.FC<PostProps> = ({ text, isLast, sender, sended, id, channelId }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { accessToken } = useContext(AuthContext)
  const { socket }  = useContext(SocketContext)
  const [isEdit, setIsEdit] = useState(false)
  const [editingValue, setEditingValue] = useState(text)
  const decoded: DecodedProps = jwt_decode(accessToken)
  const time = DateTime.fromMillis(sended).toLocaleString(DateTime.TIME_SIMPLE)

  useEffect(() => {
    if (isLast) {
      ref.current?.scrollIntoView()
    }
  }, [isLast])

  const handleMessageDelete = (): void => {
    socket?.emit("delete-message", { messageId: id, channelId })
  }

  const handleMessageEdit = (): void => {
    setIsEdit(curr => !curr)
    setEditingValue(text)
  }

  const handleEditChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditingValue(e.target.value)
  }

  const handleInputKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      socket?.emit("edit-message", { channelId, text: editingValue, messageId: id})
      setIsEdit(false)
    }

    if (e.key === 'Escape') {
      setIsEdit(false)
      setEditingValue(text)
    }
  }

  return (
    <PostContainer>
      <Avatar username={sender?.username ?? 'U'} size={32} />
      <Content>
        <Username>
          {sender?.username ?? 'Unknown'} <Time>{time}</Time>
        </Username>
        {isEdit ? <TextField id="outlined-basic" autoFocus variant="outlined" value={editingValue} onKeyDown={handleInputKeyPress} onChange={handleEditChanged} size='small' /> : <Text dangerouslySetInnerHTML={{ __html: text! }} ref={ref} />}
        
      </Content>
      {decoded._id === sender?._id && (
        <Settings>
          <IconButton aria-label='edit' size='small' sx={{ height: 'fit-content' }} onClick={handleMessageEdit}>
            <EditIcon sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton aria-label='delete' size='small' sx={{ height: 'fit-content' }} onClick={handleMessageDelete}>
            <DeleteIcon sx={{ fontSize: '16px' }} />
          </IconButton>
      </Settings>
      )}
    </PostContainer>
  )
}
