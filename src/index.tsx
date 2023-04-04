import { OpenAPI } from '@api'
import { AuthProvider } from '@context'
import { ThemeProvider } from '@mui/system'
import { GlobalStyles } from '@style/globalStyles'
import { theme } from '@style/theme'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from './App'
import './style/fonts.css'

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
