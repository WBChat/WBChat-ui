import TextFieldMUI from '@mui/material/TextField'
import styled from 'styled-components'

export const Settings = styled.div`
  display: none;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

export const TextField = styled(TextFieldMUI)`
  padding: 16px 0px 10px 0px !important;
  input {
    height: 18px !important;
    width: 100% !important;
  }
  width: 100% !important;
`

export const PostContainer = styled.div`
  color: white;
  display: flex;
  position: relative;
  gap: 10px;
  padding: 0 8px;
  :hover {
    background: #4d4e52;
  }
  &:hover ${Settings} {
    display: flex;
  }

  ${Settings} {
    position: absolute;
    right: 4px;
    top: 4px;
  }
`

export const Username = styled.div`
  font-weight: 600;
  font-size: 15px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Time = styled.span`
  font-size: 11px;
  font-weight: 300;
  margin-left: 4px;
`

export const Text = styled.div`
  font-weight: 300;
  font-size: 15px;
  margin: -8px 0;

  img {
    max-width: 500px;
  }
`
