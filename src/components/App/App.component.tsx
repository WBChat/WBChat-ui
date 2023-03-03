import { Button } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { ButtonContainer, Container, Link, Main } from './App.styles'

export const App: React.FC = () => {
  return (
    <Main>
      <ButtonContainer>
        <Link to='home'>
          <Button style={{ backgroundColor: 'white', color: '#6d9ac4' }}>
            Home
          </Button>
        </Link>
        <Link to='login'>
          <Button style={{ backgroundColor: 'white', color: '#6d9ac4' }}>
            Login
          </Button>
        </Link>
        <Link to='register'>
          <Button style={{ backgroundColor: 'white', color: '#6d9ac4' }}>
            Registration
          </Button>
        </Link>
      </ButtonContainer>
      <Container>
        <Outlet />
      </Container>
    </Main>
  )
}
