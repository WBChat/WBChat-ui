/* eslint-disable react/no-danger */
import { UserViewData } from '@api'
import axios from 'axios'
import { ReactionsWithUserNames } from '@commonTypes/channelTypes'
import { usePostFiles } from '@queries'
import { Box } from '@mui/material'
import { AuthContext, SocketContext } from '@context'
import { EmojiClickData } from 'emoji-picker-react'
import jwt_decode from 'jwt-decode'
import { EditingMessageContext } from 'src/shared/context/editingMessage/EditingMessageContext'
import { DateTime } from 'luxon'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Avatar } from '../Avatar/Avatar.component'
import {
  Content,
  PostContainer,
  Settings,
  Text,
  Time,
  Username,
} from './Post.styles'
import { DotMenu } from './components/DotMenu/DotMenu.component'
import { EmojiPicker } from './components/EmojiPicker/EmojiPicker.component'
import { PostReactions } from './components/PostReactions/PostReactions.component'
import { FileAttachment } from '../FileAttachment/FileAttachment.component'

interface PostProps {
  text?: string
  sended: number
  sender?: UserViewData
  files: string[]
  containerWidth: number
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
  containerWidth,
  id,
  channelId,
  reactions,
  files,
  members,
}) => {
  const { accessToken } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const { startEditMessage } = useContext(EditingMessageContext)
  const { data: filesInfo } = usePostFiles({ ids: files })

  const [dotMenuOpened, setDotMenuOpened] = useState(false)
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false)
  const [postReactions, setPostReactions] = useState(reactions)
  const [progress, setProgress] = useState<string[]>([])

  const ref = useRef<HTMLDivElement | null>(null)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

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

  const downloadFile = async (
    fileId: string,
    filename: string,
  ): Promise<void> => {
    setProgress(prev => [...prev, fileId])
    const file = await axios.get(
      `${process.env.REACT_APP_API_URL!}/api/attachment/files/download-file?id=${fileId}`,
      {
        responseType: 'blob', // Используем 'blob' вместо 'arraybuffer'
      },
    )

    const url = URL.createObjectURL(new Blob([file.data]))

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url
      downloadLinkRef.current.download = filename

      downloadLinkRef.current.click()
      URL.revokeObjectURL(url)
      downloadLinkRef.current.href = ''
      downloadLinkRef.current.download = ''
    }

    setProgress(prev => prev.filter(i => i !== fileId))
  }

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
    startEditMessage({
      _id: id,
      text: text ?? '',
      channel_id: channelId,
      files,
    })
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

  const isActive = emojiPickerOpened || dotMenuOpened

  const filesLineCount = useMemo(() => {
    return Math.floor(containerWidth / 192)
  }, [containerWidth])

  return (
    <PostContainer isActive={isActive}>
      <Avatar
        id={sender?.avatar}
        username={sender?.username ?? 'U'}
        size={36}
      />
      <Content>
        <Username>
          {sender?.username ?? 'Unknown'} <Time>{time}</Time>
        </Username>
        <Text dangerouslySetInnerHTML={{ __html: text! }} ref={ref} />
        {!!files?.length && (
          <Box
            sx={{
              padding: '8px 0',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              height: `${Math.ceil(files.length / filesLineCount) * 50}px`,
            }}
          >
            {filesInfo?.map(file => {
              const parts = file.filename.split('.')
              const ext = parts[parts.length - 1]
              const name = parts.slice(0, parts.length - 1).join('')

              return (
                <FileAttachment
                  key={file._id}
                  filename={name}
                  ext={ext}
                  progress={progress.includes(file._id)}
                  type='download'
                  fileSize={file.length}
                  onAction={() => downloadFile(file._id, `${name}.${ext}`)}
                />
              )
            })}
          </Box>
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
      <a ref={downloadLinkRef} target='_self' style={{ display: 'none' }} />
    </PostContainer>
  )
}
