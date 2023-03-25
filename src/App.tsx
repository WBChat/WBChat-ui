import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Home } from './components/Home'
import { Login } from './components/Login'
import { Registration } from './components/Registration'
import { AuthContext } from './context/auth/AuthContext'

export const App: React.FC = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      ) : (
        <Routes>
          <Route index element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
