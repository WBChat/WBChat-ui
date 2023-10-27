import { stringToColor } from '@helpers'

import { Container } from './Avatar.styles'

interface AvatarProps {
  url?: string
  size: number
  username: string
}

export const Avatar: React.FC<AvatarProps> = ({ url, username, size }) => {
  if (!url) {
    return (
      <Container
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: stringToColor(username),
        }}
      >
        {username[0]}
      </Container>
    )
  }

  return <img width={size} height={size} src={url} alt={username} />
}
