import { Routes as Paths } from '@constants'
import { AuthContext } from '@context'
import { MainLayout } from '@layouts'
import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Channel } from './components/Channel/Channel.component'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Registration } from './components/Registration'

export const App: React.FC = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path={Paths.Login} element={<Login />} />
          <Route path={Paths.Registration} element={<Registration />} />

          <Route path='*' element={<Navigate to={Paths.Login} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='' element={<MainLayout />}>
            <Route path={Paths.Home} element={<Home />} />
            <Route path={Paths.ChannelParams} element={<Channel />} />
          </Route>

          <Route path='*' element={<Navigate to={Paths.Home} />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
