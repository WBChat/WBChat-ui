import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { OpenAPI } from './api'
import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
const queryClient = new QueryClient()

OpenAPI.BASE = process.env.REACT_APP_API_URL!

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
