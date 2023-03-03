import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { OpenAPI } from './api'
import { App } from './components/App'
import { AuthProvider } from './context/AuthContext'
import './style/fonts.css'
import { GlobalStyles } from './style/globalStyles'
import { theme } from './style/theme'

const root = ReactDOM.createRoot(document.getElementById('root')!)
const queryClient = new QueryClient()

OpenAPI.BASE = process.env.REACT_APP_API_URL!

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>,
)
