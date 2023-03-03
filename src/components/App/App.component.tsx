import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '../Login'
import { Registration } from '../Registration'

export const App: React.FC = () => {
  const isAuth = false

  return (
    <BrowserRouter>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
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
