import { Message, UserViewData } from '@api'
import { ReactionsWithUserNames } from '@commonTypes/channelTypes'
import { CallMissedOutgoingOutlined } from '@mui/icons-material'
import { SocketContext } from '@context'
import { Box, Button, CircularProgress, useEventCallback } from '@mui/material'
import { useGetChannel, useGetMessages, useGetTeamMembers } from '@queries'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
  const { channelId, teamId } = useParams()

  const [containerWidth, setContainerWidth] = useState(0)

  const postsAreaRef = useRef<HTMLDivElement>(null)

  const [offset, setOffset] = useState(20)

  const navigate = useNavigate()

  const [posts, setPosts] = useState<Message[]>([])

  const { isFetching } = useGetMessages({
    onSuccess: (data: Message[]) => {
      setPosts(data)
    },
    channelId: channelId ?? '',
  })

  const { data: channelInfo } = useGetChannel({ channelId: channelId ?? '' })

  const { data: teamMembers, isFetching: isMembersFetching } =
    useGetTeamMembers({
      teamId: teamId!,
    })

  const members: Record<string, UserViewData> | undefined = teamMembers?.reduce(
    (acc, user) => {
      return { ...acc, [user._id]: user }
    },
    {},
  )

  const handlePostSent = useEventCallback(
    (text: string, files: string[]): void => {
      socket.emit('send-message', { recipientId: channelId, text, files })
    },
  )

  useEffect(() => {
    if (postsAreaRef.current) {
      setContainerWidth(postsAreaRef.current.getBoundingClientRect().width)
    }
  }, [posts])

  const handleResize = (x: number): void => {
    setOffset(x)
  }

  const handleReceiveMessage = useCallback(
    (post: Message): void => {
      if (post.channel_id !== channelId) {
        return
      }
      setPosts((prev: Message[]) => [...prev, post])
    },
    [channelId],
  )

  const handleMessageDeleted = useCallback(
    (payload: { messageId: string }): void => {
      setPosts(prev => prev.filter(post => post._id !== payload.messageId))
    },
    [],
  )

  const getReactionsWithUserNames = (
    reactions: Message['reactions'],
  ): ReactionsWithUserNames => {
    if (!reactions) {
      return {}
    }

    return Object.keys(reactions as object).reduce(
      (
        acc: ReactionsWithUserNames,
        reaction: string,
      ): ReactionsWithUserNames => {
        return {
          ...acc,
          [reaction]: {
            count: reactions[reaction].count,
            userNames: reactions[reaction].user_ids.map(
              (id: string) => members?.[id].username ?? '',
            ),
          },
        }
      },
      {},
    )
  }

  const handleMessageEdited = useCallback(
    (payload: {
      payload: { messageId: string; text: string; files: string[] }
    }): void => {
      setPosts(prev => {
        return prev.map(post =>
          post._id === payload.payload.messageId
            ? {
                ...post,
                text: payload.payload.text,
                files: payload.payload.files,
              }
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

    return () => {
      socket.off('receive-message', handleReceiveMessage)
      socket.off('message-deleted', handleMessageDeleted)
      socket.off('message-edited', handleMessageEdited)
    }
  }, [handleReceiveMessage, handleMessageDeleted, handleMessageEdited])

  return (
    <ChannelContainer>
      <ChannelHeader>
        <ChannelTitle>{channelInfo?.name}</ChannelTitle>
        <Button
          variant='outlined'
          size='small'
          startIcon={<CallMissedOutgoingOutlined />}
          onClick={() => navigate(`${window.location.pathname}/calling_room`)}
        >
          Calling room
        </Button>
      </ChannelHeader>
      {isFetching ||
        (isMembersFetching && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ))}
      <PostsArea
        offset={`${offset}px`}
        ref={postsAreaRef}
        hide={isFetching || isMembersFetching}
      >
        {containerWidth !== 0 &&
          posts.map((post: Message, index: number) => {
            const postReactions = getReactionsWithUserNames(post.reactions)

            return (
              <Post
                text={post.text}
                containerWidth={containerWidth}
                id={post._id}
                files={post.files}
                channelId={post.channel_id}
                reactions={postReactions}
                sended={Number(post.sendedDate)}
                sender={members?.[post.sender]}
                key={post._id}
                isLast={index === posts.length - 1}
                members={members ?? {}}
              />
            )
          })}
      </PostsArea>

      <EditorContainer>
        <Editor
          onResize={handleResize}
          onSend={handlePostSent}
          channelId={channelId!}
        />
      </EditorContainer>
    </ChannelContainer>
  )
}
