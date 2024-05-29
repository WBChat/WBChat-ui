import { stringToColor } from '@helpers'
import { cld } from 'src/App'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { AdvancedImage } from '@cloudinary/react'

import { Container } from './Avatar.styles'

interface AvatarProps {
  id?: string
  size?: number
  fullSize?: boolean
  fontSize?: string
  username: string
}

export const Avatar: React.FC<AvatarProps> = ({
  id,
  username,
  size,
  fontSize,
  fullSize,
}) => {
  if (!id) {
    return (
      <Container
        style={{
          width: fullSize ? '100%' : `${size}px`,
          height: fullSize ? '100%' : `${size}px`,
          fontSize: fontSize ?? undefined,
          border: '1px solid white',
          background: stringToColor(username),
        }}
      >
        {username[0]}
      </Container>
    )
  }

  const myImage = cld.image(id)

  if (size) {
    myImage.resize(fill().width(size).height(size))
  }

  return (
    <div
      style={{
        width: fullSize ? '100%' : `${size}px`,
        height: fullSize ? '100%' : `${size}px`,
        border: '1px solid white',
      }}
    >
      <AdvancedImage cldImg={myImage} />
    </div>
  )
}
