import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, Main } from './AuthLayout.styles'

interface PropsType {
  children: React.ReactNode
}

export const AuthLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <Main>
      <Container>
        {children}
        <Outlet />
      </Container>
    </Main>
  )
}
