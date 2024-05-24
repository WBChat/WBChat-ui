import { stringToColor } from '@helpers'

import { Container } from './Avatar.styles'

interface AvatarProps {
  url?: string
  size?: number
  fullSize?: boolean
  fontSize?: string
  username: string
}

export const Avatar: React.FC<AvatarProps> = ({
  url,
  username,
  size,
  fontSize,
  fullSize,
}) => {
  if (!url) {
    return (
      <Container
        style={{
          width: fullSize ? '100%' : `${size}px`,
          height: fullSize ? '100%' : `${size}px`,
          fontSize: fontSize ?? undefined,
          background: stringToColor(username),
        }}
      >
        {username[0]}
      </Container>
    )
  }

  return <img width={size} height={size} src={url} alt={username} />
}
