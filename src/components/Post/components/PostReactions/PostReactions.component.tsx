import { ReactionsWithUserNames } from '@commonTypes/channelTypes'
import { useGetCurrentUser } from '@queries'

import { Container, Reaction } from './PostReactions.styles'

interface Props {
  reactions: ReactionsWithUserNames
  onReactionClick?: (reaction: string, own: boolean) => void
}

export const PostReactions: React.FC<Props> = ({
  reactions,
  onReactionClick,
}) => {
  const { data: user } = useGetCurrentUser()

  return (
    <Container>
      {Object.keys(reactions).map((emoji: string) => {
        const own = reactions[emoji].userNames.includes(user?.username ?? '')

        return (
          <Reaction own={own} onClick={() => onReactionClick?.(emoji, own)}>
            <span>{emoji}</span>
            <span>{reactions[emoji].count}</span>
          </Reaction>
        )
      })}
    </Container>
  )
}
