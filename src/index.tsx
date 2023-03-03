import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { OpenAPI } from './api'
import { App } from './components/App'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Registration } from './components/Registration'

const root = ReactDOM.createRoot(document.getElementById('root')!)
const queryClient = new QueryClient()

OpenAPI.BASE = process.env.REACT_APP_API_URL!

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
)
