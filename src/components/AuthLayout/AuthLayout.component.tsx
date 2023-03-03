import { Button } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { ButtonContainer, Container, Link, Main } from './AuthLayout.styles'

interface PropsType {
  children: React.ReactNode
}

export const AuthLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <Main>
      <ButtonContainer>
        <Link to='/login'>
          <Button variant='outlined'>Login</Button>
        </Link>
        <Link to='/register'>
          <Button variant='outlined'>Registration</Button>
        </Link>
      </ButtonContainer>
      <Container>
        {children}
        <Outlet />
      </Container>
    </Main>
  )
}
