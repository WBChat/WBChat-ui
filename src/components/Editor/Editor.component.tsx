import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {
  ActionsPanel,
  EditorContainer,
  EditorInput,
  SendButton,
} from './Editor.styles'

export const Editor: React.FC = () => {
  return (
    <EditorContainer>
      <EditorInput
        wrapperClassName='editor-wrapper'
        editorClassName='editor'
        toolbarClassName='editor-toolbar'
        toolbar={{
          options: ['inline', 'emoji'],
        }}
      />
      <ActionsPanel>
        <SendButton>send</SendButton>
      </ActionsPanel>
    </EditorContainer>
  )
}
