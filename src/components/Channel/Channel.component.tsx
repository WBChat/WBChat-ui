import { useParams } from 'react-router-dom'

import { Editor } from '../Editor/Editor.component'
import {
  ChannelContainer,
  ChannelHeader,
  ChannelTitle,
  EditorContainer,
} from './Channel.styles'

export const Channel: React.FC = () => {
  const { channelId } = useParams()

  const handlePostSent = (text: string): void => {
    console.log(text)
  }

  return (
    <ChannelContainer>
      <ChannelHeader>
        <ChannelTitle>{channelId}</ChannelTitle>
      </ChannelHeader>
      <EditorContainer>
        <Editor onSend={handlePostSent} />
      </EditorContainer>
    </ChannelContainer>
  )
}
