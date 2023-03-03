import { Link as RRDLink } from 'react-router-dom'
import styled from 'styled-components'

export const Main = styled.div`
  background: #6d9ac4;
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

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Link = styled(RRDLink)`
  text-decoration: none;
`
