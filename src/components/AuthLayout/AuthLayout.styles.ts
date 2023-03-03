import { Link as RRDLink } from 'react-router-dom'
import styled from 'styled-components'

export const Main = styled.div`
  background: lightgray;
  height: 100vh;
  margin: -8px;
  display: flex;
  justify-content: center;
`

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 1780px;
  margin-top: 370px;
`

export const Link = styled(RRDLink)`
  text-decoration: none;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`
