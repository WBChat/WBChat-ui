import { SocketContext } from '@context'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import {
  CallEnd,
  Mic,
  MicOff,
  Person,
  VideoCall,
  Videocam,
  VideocamOff,
} from '@mui/icons-material'
import { useGetChannel, useGetCurrentUser } from '@queries'
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Header,
} from 'src/shared/layouts/MainLayout/MainLayout.styles'
import { Actions, VideoCard, VideoGrid, VideoPart } from './CallingRoom.style'
import { Avatar } from '../Avatar/Avatar.component'
import { useWebRtc } from './hooks/useWebRTC'

const getLineCount = (count: number): number => {
  if (count <= 2) {
    return 1
  }

  if (count <= 8) {
    return 2
  }

  return 3
}

export const CallingRoom: React.FC = () => {
  const { channelId } = useParams()
  const { socket } = useContext(SocketContext)

  const { currentUser } = useGetCurrentUser()

  const navigate = useNavigate()

  const {
    users,
    videoRefs,
    muteAudio,
    muteVideo,
    unmuteAudio,
    unmuteVideo,
    isAudioMuted,
    isVideoMuted,
    isRemoteAudiosMuted,
    isRemoteVideosMuted,
    isSpeaking,
  } = useWebRtc()

  const [videoElementSize, setVideoElementSize] = useState({
    width: '0px',
    height: '0px',
    fontSize: '12px',
  })

  const containerRef = useRef<HTMLDivElement | null>(null)

  const { data: channelInfo } = useGetChannel({ channelId: channelId ?? '' })

  useEffect(() => {
    socket.emit('connect-user-to-call-room', { channelId })

    return () => {
      socket.emit('disconnect-user-from-call-room', { channelId })
    }
  }, [])

  const onResize = useCallback(() => {
    const lines = getLineCount(users.length)
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width ?? 1
    const containerHeight =
      containerRef.current?.getBoundingClientRect().height ?? 1

    const elementsCount = users.length === 1 ? 2 : users.length

    const elementHeight = containerHeight / lines
    const elementWidth = containerWidth / Math.ceil(elementsCount / lines)
    const fontSize = Math.floor(elementHeight / 8)

    setVideoElementSize({
      width: `${elementWidth}px`,
      height: `${elementHeight}px`,
      fontSize: `${fontSize}px`,
    })
  }, [users])

  useLayoutEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  const leaveCall = (): void => {
    navigate(window.location.pathname.replace('/calling_room', ''))
  }

  return (
    <Container style={{ minHeight: '100vh', width: '100%' }}>
      <Header>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            color: 'white',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <VideoCall fontSize='large' />
          <Box
            sx={{
              color: 'white',
              fontSize: '21px',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            &quot;{channelInfo?.name}&quot; channel calling room
          </Box>
        </Box>
      </Header>
      <VideoPart ref={containerRef}>
        <VideoGrid>
          {users.map(user => {
            return (
              <VideoCard
                key={user._id}
                width={videoElementSize.width}
                height={videoElementSize.height}
                isSpeaking={isSpeaking[user._id]}
              >
                <video
                  ref={ref => {
                    videoRefs.current[user._id] = ref!
                  }}
                  width={videoElementSize.width}
                  style={{
                    display: isRemoteVideosMuted[user._id] ? 'none' : 'block',
                    transform: 'scaleX(-1)',
                  }}
                  muted={user._id === currentUser?._id}
                  autoPlay
                  playsInline
                />
                {isRemoteVideosMuted[user._id] && (
                  <Avatar
                    id={user.avatar}
                    username={user.username}
                    fullSize
                    fontSize={videoElementSize.fontSize}
                  />
                )}
                <Box
                  className='name'
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    top: 0,
                    left: 0,
                    padding: '4px 12px',
                    opacity: 0,
                    color: 'white',
                    background: 'rgb(0, 0, 0, 0.1)',
                  }}
                >
                  <Person fontSize='small' />
                  <Typography>{user.username}</Typography>
                </Box>
                {isRemoteAudiosMuted[user._id] &&
                  currentUser?._id !== user._id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        padding: '4px',
                        background: 'black',
                        bottom: 0,
                        left: 0,
                      }}
                    >
                      <MicOff color='error' />
                    </Box>
                  )}
              </VideoCard>
            )
          })}
          {users.length === 1 && (
            <VideoCard
              width={videoElementSize.width}
              height={videoElementSize.height}
            >
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  color: 'white',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography fontSize={21}>
                  You are the only participant in this calling room
                </Typography>
              </Box>
            </VideoCard>
          )}
        </VideoGrid>
      </VideoPart>
      <Actions>
        {!isAudioMuted ? (
          <IconButton onClick={muteAudio}>
            <Mic fontSize='large' />
          </IconButton>
        ) : (
          <IconButton onClick={unmuteAudio}>
            <MicOff fontSize='large' color='error' />
          </IconButton>
        )}
        {!isVideoMuted ? (
          <IconButton onClick={muteVideo}>
            <Videocam fontSize='large' />
          </IconButton>
        ) : (
          <IconButton onClick={unmuteVideo}>
            <VideocamOff fontSize='large' color='error' />
          </IconButton>
        )}
        <Divider orientation='vertical' light flexItem />
        <IconButton onClick={leaveCall}>
          <CallEnd fontSize='large' color='error' />
        </IconButton>
      </Actions>
    </Container>
  )
}
