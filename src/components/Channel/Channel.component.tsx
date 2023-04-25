import {
  ChannelsControllerService,
  Message,
  MessagesControllerService,
  UsersControllerService,
} from '@api'
import { SocketContext } from '@context'
import { Box, CircularProgress } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
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

  const {
    data: members,
    refetch: fetchMembers,
    isFetching: isMembersFetching,
  } = useQuery(
    ['get-channel', channelInfo],
    async () => {
      let users = []

      if (channelInfo?.isCommon) {
        users = (await UsersControllerService.usersControllerGetUsersList({}))
          .list
      }

      users = (await UsersControllerService.usersControllerGetUsersList({}))
        .list

      return users.reduce((acc, user) => {
        return { ...acc, [user._id]: user }
      }, {})
    },
    {
      refetchOnMount: false,
    },
  )

  useEffect(() => {
    if (!channelInfo) {
      return
    }

    fetchMembers()
  }, [channelInfo])

  const handlePostSent = (text: string): void => {
    socket?.emit('send-message', { recipientId: channelId, text })
  }

  useEffect(() => {
    console.log(socket)
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
