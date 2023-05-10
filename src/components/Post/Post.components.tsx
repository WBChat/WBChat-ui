/* eslint-disable react/no-danger */
import { UserViewData } from '@api'
import { AuthContext } from '@context'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import jwt_decode from 'jwt-decode'
import { DateTime } from 'luxon'
import { useContext, useEffect, useRef, useState } from 'react'

import { Avatar } from '../Avatar/Avatar.component'
import {
  Content,
  PostContainer,
  Settings,
  Text,
  Time,
  Username,
} from './Post.styles'

interface PostProps {
  text?: string
  sended: number
  sender?: UserViewData
  isLast: boolean
}

interface DecodedProps {
  email: string
  exp: number
  iat: number
  _id: string
}

export const Post: React.FC<PostProps> = ({ text, isLast, sender, sended }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { accessToken } = useContext(AuthContext)
  const decoded: DecodedProps = jwt_decode(accessToken)
  const time = DateTime.fromMillis(sended).toLocaleString(DateTime.TIME_SIMPLE)

  const [isShown, setIsShown] = useState(false)

  const handleCloseOth = (): void => {
    setIsShown(false)
  }

  const handleShowOth = (): void => {
    setIsShown(current => !current)
  }

  useEffect(() => {
    if (isLast) {
      ref.current?.scrollIntoView()
    }
  }, [isLast])

  return (
    <PostContainer onMouseLeave={handleCloseOth}>
      <Avatar username={sender?.username ?? 'U'} size={32} />
      <Content>
        <Username>
          {sender?.username ?? 'Unknown'} <Time>{time}</Time>
        </Username>
        <Text dangerouslySetInnerHTML={{ __html: text! }} ref={ref} />
      </Content>
      <Settings onClick={handleShowOth}>...</Settings>
      {isShown && decoded._id === sender?._id && (
        <IconButton aria-label='delete' size='small'>
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      )}
    </PostContainer>
  )
}
