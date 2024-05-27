import { Button } from '@mui/material'
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

  .tox-tinymce {
    height: 116px !important;
    border-color: #404144 !important;
  }

  .tox-statusbar {
    display: none !important;
  }

  .tox {
    color: white !important;
    svg {
      fill: #8F8F92 !important;
    }

    button:hover, .tox-tbtn:hover {
      background-color: rgba(45, 158, 224, 0.08);
    }

    button.tox-tbtn--enabled, .tox-tbtn.tox-tbtn--enabled {
      background-color: rgba(45, 158, 224, 0.20);
    }
  }

  .tox-editor-header, .tox-toolbar__primary {
    background: #292B2D !important
  }
`

export const SendButton = styled(Button)``

export const Quote = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid #42a5f5;
  background-color: #2B2E30;
  padding: 4px 10px;
  margin-bottom: 4px;
  position: relative;
`

export const QuoteBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 18px;
  overflow: hidden;

  text-overflow: ellipsis;
  max-width: calc(100% - 32px)
`
