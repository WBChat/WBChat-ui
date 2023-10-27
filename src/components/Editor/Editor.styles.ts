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
