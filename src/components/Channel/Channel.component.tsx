import { Message } from '@api'
import { SocketContext } from '@context'
import { Box, CircularProgress } from '@mui/material'
import { useGetChannel, useGetMembers, useGetMessages } from '@queries'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Editor } from '../Editor/Editor.component'
import { Post } from '../Post/Post.components'
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

  const { isFetching } = useGetMessages({
    onSuccess: (data: Message[]) => {
      setPosts((prev: Message[]) => [...data, ...prev])
    },
    channelId: channelId ?? '',
  })

  const { data: channelInfo } = useGetChannel({ channelId: channelId ?? '' })

  const { data: members, isFetching: isMembersFetching } = useGetMembers({
    channelInfo,
  })

  const handlePostSent = (text: string): void => {
    socket.emit('send-message', { recipientId: channelId, text })
  }

  const handleReceiveMessage = useCallback((post: Message): void => {
    setPosts((prev: Message[]) => [...prev, post])
  }, [])

  const handleMessageDeleted = useCallback(
    (payload: { messageId: string }): void => {
      setPosts(prev => prev.filter(post => post._id !== payload.messageId))
    },
    [],
  )

  const handleMessageEdited = useCallback(
    (payload: { payload: { messageId: string; text: string } }): void => {
      setPosts(prev => {
        return prev.map(post =>
          post._id === payload.payload.messageId
            ? { ...post, text: payload.payload.text }
            : post,
        )
      })
    },
    [],
  )

  useEffect(() => {
    socket.emit('connect-to-channel', { channelId })
  }, [channelId])

  useEffect(() => {
    socket.on('receive-message', handleReceiveMessage)
    socket.on('message-deleted', handleMessageDeleted)
    socket.on('message-edited', handleMessageEdited)
  }, [handleReceiveMessage, handleMessageDeleted, handleMessageEdited])

  return (
    <ChannelContainer>
      <ChannelHeader>
        <ChannelTitle>{channelInfo?.name}</ChannelTitle>
      </ChannelHeader>
      {isFetching || isMembersFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <PostsArea>
          {posts.map((post: Message, index: number) => {
            return (
              <Post
                text={post.text}
                id={post._id}
                channelId={post.channel_id}
                sended={Number(post.sendedDate)}
                sender={members?.[post.sender as keyof typeof members]}
                key={post._id}
                isLast={index === posts.length - 1}
              />
            )
          })}
        </PostsArea>
      )}

      <EditorContainer>
        <Editor onSend={handlePostSent} />
      </EditorContainer>
    </ChannelContainer>
  )
}
