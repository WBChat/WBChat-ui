import TextFieldMUI from '@mui/material/TextField'
import styled from 'styled-components'

export const Settings = styled.div`
  display: ${({isActive}: {isActive: boolean}) => isActive ? 'flex' : 'none'};
  user-select: none;
  padding: 3px 6px;
  gap: 4px;
  border: 1px solid #47494C;
  border-radius: 4px;
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
  padding: 0px 32px;
  padding-top: 10px;
  transition: background 150ms;
  background: ${({isActive}: {isActive: boolean}) => isActive ? '#303234' : 'transparent'};
  :hover {
    background: rgba(223, 223, 227, 0.04);
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
  font-weight: 500;
  position: relative;
  top: -3px;
  font-size: 15px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Time = styled.span`
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  color: #939497;
`

export const Text = styled.div`
  font-weight: 300;
  font-size: 15px;
  margin: -12px 0;

  img {
    max-width: 500px;
  }
`
