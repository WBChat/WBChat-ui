import {
  ChannelsControllerService,
  Message,
  MessagesControllerService,
} from '@api'
import { SocketContext } from '@context'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Editor } from '../Editor/Editor.component'
import {
  ChannelContainer,
  ChannelHeader,
  ChannelTitle,
  EditorContainer,
  PostsArea,
} from './Channel.styles'

export const Channel: React.FC = () => {
  const { socket } = useContext(SocketContext)
  const { channelId } = useParams()

  const [posts, setPosts] = useState<Message[]>([])

  const { isFetching } = useQuery(
    'get-messages',
    () => {
      return MessagesControllerService.messagesControllerGetChannelMessages({
        channelId: channelId!,
      })
    },
    {
      onSuccess(data) {
        setPosts((prev: Message[]) => [...data, ...prev])
      },
      refetchOnWindowFocus: false,
    },
  )

  const { data: channelInfo } = useQuery(
    'get-channel',
    () => {
      return ChannelsControllerService.channelsControllerGetChannelById({
        channelId: channelId!,
      })
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  const handlePostSent = (text: string): void => {
    socket?.emit('send-message', { recipientId: channelId, text })
  }

  useEffect(() => {
    socket?.emit('connect-to-channel', { channelId })

    socket?.on('receive-message', post => {
      setPosts((prev: Message[]) => [...prev, post])
    })
  }, [socket])

  return (
    <ChannelContainer>
      <ChannelHeader>
        <ChannelTitle>{channelInfo?.name}</ChannelTitle>
      </ChannelHeader>
      <PostsArea>
        {posts.map((post: Message) => {
          return post.text
        })}
      </PostsArea>
      <EditorContainer>
        <Editor onSend={handlePostSent} />
      </EditorContainer>
    </ChannelContainer>
  )
}
