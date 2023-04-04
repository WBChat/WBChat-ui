import { Button } from '@mui/material'
import { Editor } from 'react-draft-wysiwyg'
import styled from 'styled-components'

export const ActionsPanel = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  bottom: 4px;
  left: 4px;
  right: 4px;
`

export const EditorContainer = styled.div`
  position: relative;

  .editor-toolbar {
    background: #292b2d;
    padding: 12px 16px;
    border: none;
    border-radius: 8px 8px 0 0;
    .rdw-option-wrapper {
      padding: 2px;
      border: none;
      margin: 0 6px;
      background-color: #90caf9;
      img {
        width: 13px;
      }
    }

    .rdw-emoji-modal {
      top: -225px;
    }

    .rdw-image-wrapper,
    .rdw-emoji-wrapper,
    .rdw-inline-wrapper {
      margin: 0;
    }
  }

  .editor-wrapper {
    border: 1px solid #404143;
    border-radius: 8px;
  }

  .editor {
    padding: 0px 12px;
    color: #fff;
    padding-bottom: 32px;
  }
`

export const EditorInput = styled(Editor)`
  textarea {
    padding-bottom: 20px;
  }
`

export const SendButton = styled(Button)``
