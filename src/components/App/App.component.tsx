import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { Login } from '../Login'
import { Registration } from '../Registration'

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
        <Routes />
      )}
    </BrowserRouter>
  )
}
