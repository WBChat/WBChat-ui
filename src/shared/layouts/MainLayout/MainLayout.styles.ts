import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button as ButtonMUI,
  ToggleButton as ToggleButtonMUI,
} from '@mui/material'
import styled, { css } from 'styled-components'

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
  color: rgba(223, 223, 227, 0.72);
  max-width: 220px;
  width: 40%;
  display: flex;
  flex-direction: column;
  background-color: #2B2E30;
  padding: 20px;
`

export const Title = styled.div`
  color: #989aa2;
  font-weight: 700;
`

export const Header = styled.div`
  background-color: #3A3A3A;
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

export const List = styled.div`
  padding: 16px 0;
`

export const ListGroup = styled(Accordion)`
  background: transparent !important;
  cursor: pointer !important;
  box-shadow: none !important;
`

export const ListGroupDetails = styled(AccordionDetails)`
  box-shadow: none !important;
  padding: 0 !important;
`

export const ListGroupSummary = styled(AccordionSummary)`
  padding: 0 !important;
  cursor: pointer !important;
  font-weight: 600;
  font-size: 15px;
  min-height: 36px !important;
  .MuiAccordionSummary-content {
    margin: 0 !important;
  }

  svg {
    fill: rgba(223, 223, 227, 0.6) !important;
    width: 20px;
  }
  color: rgba(223, 223, 227, 0.6) !important;
`

interface ChannelListItemProps {
  active?: boolean
}

export const ChannelListItem = styled.div<ChannelListItemProps>`
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 3px;
  color: rgba(223, 223, 227, 0.72);
  cursor: pointer;
  ${({ active }: ChannelListItemProps) =>
    active &&
    css`
      background: #42a5f5;
      color: #fff;
      &:hover {
        background: #42a5f5 !important;
        color: #fff !important;
      }
    `};
  &:hover {
    background: #3a3a3a;
  }
`
