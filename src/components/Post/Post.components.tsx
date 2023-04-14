/* eslint-disable react/no-danger */
import { PostContainer } from './Post.styles'

interface PostProps {
  text?: string
}

export const Post: React.FC<PostProps> = ({ text }) => {
  return (
    <PostContainer>
      <div dangerouslySetInnerHTML={{ __html: text! }} />
    </PostContainer>
  )
}
