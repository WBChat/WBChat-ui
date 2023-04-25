/* eslint-disable react/no-danger */
import { UserViewData } from '@api'
import { DateTime } from 'luxon'
import { useEffect, useRef } from 'react'

import { Avatar } from '../Avatar/Avatar.component'
import { Content, PostContainer, Text, Time, Username } from './Post.styles'

interface PostProps {
  text?: string
  sended: number
  sender?: UserViewData
  isLast: boolean
}

export const Post: React.FC<PostProps> = ({ text, isLast, sender, sended }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const time = DateTime.fromMillis(sended).toLocaleString(DateTime.TIME_SIMPLE)

  useEffect(() => {
    if (isLast) {
      ref.current?.scrollIntoView()
    }
  }, [isLast])

  return (
    <PostContainer>
      <Avatar username={sender?.username ?? 'U'} size={32} />
      <Content>
        <Username>
          {sender?.username ?? 'Unknown'} <Time>{time}</Time>
        </Username>
        <Text dangerouslySetInnerHTML={{ __html: text! }} ref={ref} />
      </Content>
    </PostContainer>
  )
}
