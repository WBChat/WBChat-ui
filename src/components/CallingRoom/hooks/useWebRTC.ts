import { UserViewData } from '@api'
import { SocketContext } from '@context'
import { useGetCurrentUser } from '@queries'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Result {
  users: UserViewData[]
  videoRefs: React.MutableRefObject<Record<string, HTMLVideoElement>>
  muteAudio: () => void
  muteVideo: () => void
  unmuteAudio: () => void
  unmuteVideo: () => void
  isAudioMuted: boolean
  isVideoMuted: boolean
  isRemoteVideosMuted: Record<string, boolean>
  isRemoteAudiosMuted: Record<string, boolean>
  isSpeaking: Record<string, boolean>
}

export const useWebRtc = (): Result => {
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({})
  const streamRefs = useRef<Record<string, MediaStream>>({})
  const bufferedCandidates = useRef<Record<string, RTCIceCandidate[]>>({})
  const remoteDescriptionsSet = useRef<Record<string, boolean>>({})
  const localStream = useRef<MediaStream>(new MediaStream())

  const [users, setUsers] = useState<UserViewData[]>([])
  const [init, setInit] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState<Record<string, boolean>>({})
  const [isRemoteVideosMuted, setIsRemoteVideoMuted] = useState<
    Record<string, boolean>
  >({})
  const [isRemoteAudiosMuted, setIsRemoteAudioMuted] = useState<
    Record<string, boolean>
  >({})

  const { socket } = useContext(SocketContext)
  const { channelId } = useParams()
  const {currentUser} = useGetCurrentUser()

  const createPeer = (userId: string, socketId: string): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })

    peerConnection.ontrack = event => {
      videoRefs.current[userId].srcObject = event.streams[0]

      streamRefs.current[userId] = event.streams[0]
    }

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('peer-update', {
          candidate: event.candidate,
          to: socketId,
        })
      }
    }

    return peerConnection
  }

  const handleUsersUpdated = useCallback(
    (payload: { users: UserViewData[]; socketIds: Record<string, string> }) => {
      setUsers(payload.users)

      const joinedUsers = payload.users.filter(
        user =>
          currentUser?._id !== user._id && !users.some(u => u._id === user._id),
      )
      const leavedUsers = users.filter(
        user => !payload.users.some(u => u._id === user._id),
      )

      joinedUsers.forEach(async user => {
        if (!payload.socketIds) return
        const peer = createPeer(user._id, payload.socketIds[user._id])

        localStream.current
          .getTracks()
          .forEach(track => peer.addTrack(track, localStream.current))

        peerConnections.current[user._id] = peer
      })

      leavedUsers.forEach(user => {
        peerConnections.current[user._id].close()
        delete peerConnections.current[user._id]
      })
    },
    [peerConnections, users, currentUser],
  )

  const muteAudio = (): void => {
    localStream.current.getAudioTracks()[0].enabled = false
    socket.emit('muted-audio', { channelId })
    setIsAudioMuted(true)
  }

  const unmuteAudio = (): void => {
    localStream.current.getAudioTracks()[0].enabled = true
    socket.emit('unmuted-audio', { channelId })
    setIsAudioMuted(false)
  }

  const muteVideo = (): void => {
    localStream.current.getVideoTracks()[0].enabled = false
    socket.emit('muted-video', { channelId })
    setIsVideoMuted(true)
  }

  const unmuteVideo = (): void => {
    localStream.current.getVideoTracks()[0].enabled = true
    socket.emit('unmuted-video', { channelId })
    setIsVideoMuted(false)
  }

  const handleOffer = useCallback(
    async (payload: {
      offer: RTCSessionDescriptionInit
      sender: string
      userId: string
    }) => {
      const peerConnection = peerConnections.current[payload.userId]

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(payload.offer),
      )

      remoteDescriptionsSet.current[payload.userId] = true

      const answer = await peerConnection.createAnswer()

      await peerConnection.setLocalDescription(
        new RTCSessionDescription(answer),
      )

      socket.emit('rpc-answer-send', {
        answer,
        to: payload.sender,
      })

      if (bufferedCandidates.current[payload.userId]?.length) {
        bufferedCandidates.current[payload.userId].forEach(candidate => {
          peerConnection.addIceCandidate(candidate)
        })
        delete bufferedCandidates.current[payload.userId]
      }
    },
    [peerConnections],
  )

  const handleAnswer = useCallback(
    async (payload: { answer: RTCSessionDescriptionInit; userId: string }) => {
      const peerConnection = peerConnections.current[payload.userId]

      peerConnection.setRemoteDescription(
        new RTCSessionDescription(payload.answer),
      )

      remoteDescriptionsSet.current[payload.userId] = true

      if (bufferedCandidates.current[payload.userId]?.length) {
        bufferedCandidates.current[payload.userId].forEach(candidate => {
          peerConnection.addIceCandidate(candidate)
        })
        delete bufferedCandidates.current[payload.userId]
      }
    },
    [peerConnections],
  )

  const handlePeerUpdated = useCallback(
    async (payload: { candidate: RTCIceCandidate; userId: string }) => {
      const peerConnection = peerConnections.current[payload.userId]

      if (remoteDescriptionsSet.current[payload.userId]) {
        peerConnection.addIceCandidate(new RTCIceCandidate(payload.candidate))
      } else if (bufferedCandidates.current[payload.userId]) {
        bufferedCandidates.current[payload.userId].push(payload.candidate)
      } else {
        bufferedCandidates.current[payload.userId] = [payload.candidate]
      }
    },
    [peerConnections],
  )

  const startPeerConnection = useCallback(
    async (payload: {
      users: UserViewData[]
      socketIds: Record<string, string>
    }) => {
      const peers: Record<string, RTCPeerConnection> = {}

      payload.users.forEach(async user => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        localStream.current = stream

        if (!currentUser || user._id === currentUser._id) {
          if (currentUser) {
            videoRefs.current[currentUser._id].srcObject = stream
            streamRefs.current[currentUser._id] = stream

            setInit(true)
          }

          return
        }
        const peer = createPeer(user._id, payload.socketIds[user._id])

        peers[user._id] = peer

        localStream.current
          .getTracks()
          .forEach(track => peer.addTrack(track, localStream.current))

        const offer = await peer.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })

        await peer.setLocalDescription(new RTCSessionDescription(offer))

        socket.emit('rpc-offer-send', {
          offer,
          to: payload.socketIds[user._id],
        })
      })

      peerConnections.current = peers
      setUsers(payload.users)
    },
    [currentUser],
  )

  const handleMutedAudio = useCallback((payload: { userId: string }) => {
    setIsRemoteAudioMuted(prev => ({ ...prev, [payload.userId]: true }))
  }, [])

  const handleUnmutedAudio = useCallback((payload: { userId: string }) => {
    setIsRemoteAudioMuted(prev => ({ ...prev, [payload.userId]: false }))
  }, [])

  const handleMutedVideo = useCallback((payload: { userId: string }) => {
    setIsRemoteVideoMuted(prev => ({ ...prev, [payload.userId]: true }))
  }, [])

  const handleUnmutedVideo = useCallback((payload: { userId: string }) => {
    setIsRemoteVideoMuted(prev => ({ ...prev, [payload.userId]: false }))
  }, [])

  useEffect(() => {
    if (!init) {
      return
    }
    const audios: Record<
      string,
      { analyser: AnalyserNode }
    > = Object.keys(streamRefs.current).reduce((acc, key) => {
      const stream = streamRefs.current[key]
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()

      analyser.fftSize = 256

      const source = audioContext.createMediaStreamSource(stream)

      source.connect(analyser)

      return { ...acc, [key]: { analyser } }
    }, {})

    const interval = setInterval(() => {
      Object.keys(audios).forEach(key => {
        const audio = audios[key]
        const dataArray = new Uint8Array(audio.analyser.frequencyBinCount)

        audio.analyser.getByteFrequencyData(dataArray)

        const sum = dataArray.reduce((a, b) => a + b, 0)

        const average = sum / dataArray.length

        setIsSpeaking(prev => ({ ...prev, [key]: average > 20 }))
      })
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [init])

  useEffect(() => {
    socket.on('call-room-users-list-updated', handleUsersUpdated)
    socket.on('rpc-offer-sent', handleOffer)
    socket.on('rpc-answer-sent', handleAnswer)
    socket.on('peer-updated', handlePeerUpdated)
    socket.on('start-peer-connection', startPeerConnection)
    socket.on('muted-audio', handleMutedAudio)
    socket.on('unmuted-audio', handleUnmutedAudio)
    socket.on('muted-video', handleMutedVideo)
    socket.on('unmuted-video', handleUnmutedVideo)

    return () => {
      socket.off('call-room-users-list-updated', handleUsersUpdated)
      socket.off('rpc-offer-sent', handleOffer)
      socket.off('rpc-answer-sent', handleAnswer)
      socket.off('peer-updated', handlePeerUpdated)
      socket.off('start-peer-connection', startPeerConnection)
      socket.off('muted-audio', handleMutedAudio)
      socket.off('unmuted-audio', handleUnmutedAudio)
      socket.off('muted-video', handleMutedVideo)
      socket.off('unmuted-video', handleUnmutedVideo)
    }
  }, [
    handleUsersUpdated,
    handleOffer,
    handleAnswer,
    handlePeerUpdated,
    startPeerConnection,
    handleMutedAudio,
    handleUnmutedAudio,
    handleMutedVideo,
    handleUnmutedVideo,
  ])

  useEffect(() => {
    return () => {
      localStream.current.getTracks().forEach(track => track.stop())
      Object.values(peerConnections.current).forEach(peer => peer.close())
    }
  }, [])

  return {
    users,
    videoRefs,
    muteAudio,
    unmuteAudio,
    muteVideo,
    unmuteVideo,
    isSpeaking,
    isAudioMuted,
    isVideoMuted,
    isRemoteVideosMuted,
    isRemoteAudiosMuted,
  }
}
