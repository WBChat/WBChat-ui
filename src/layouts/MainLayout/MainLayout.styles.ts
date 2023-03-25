import {
  Button as ButtonMUI,
  ToggleButton as ToggleButtonMUI,
} from '@mui/material'
import styled from 'styled-components'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Container = styled.div`
  color: black;
  background-color: #313338;
  width: 100%;
`

export const Sidebar = styled.div`
  color: #989aa2;
  width: 15%;
  display: flex;
  flex-direction: column;
  background-color: #2b2d31;
  padding: 20px;
`

export const Title = styled.div`
  color: #989aa2;
  font-weight: 700;
`

export const Header = styled.div`
  background-color: #2b2d31;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1e1f22;
  padding: 5px 20px;
`

export const ContentBox = styled.div`
  display: flex;
  height: 100%;
`

export const UsersBox = styled.div`
  margin-top: 10px;
`

export const UserContainer = styled(ButtonMUI)`
  width: 100%;
  display: flex !important;
  justify-content: start !important;
  align-items: center !important;
  gap: 15px;
  line-height: 20px !important;
`

export const ToggleButton = styled(ToggleButtonMUI)`
  width: 50%;
`

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Name = styled.div``

export const Status = styled.div`
  display: flex;
  justify-content: start;
  font-size: 10px;
`

export const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`
