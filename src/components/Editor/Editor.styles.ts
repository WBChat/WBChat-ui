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
  }

  .tox-statusbar {
    display: none !important;
  }
`

export const SendButton = styled(Button)``
