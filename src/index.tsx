import { OpenAPI } from '@api'
import { AuthProvider, SocketProvider } from '@context'
import { ThemeProvider } from '@mui/system'
import '@style/fonts.css'
import { GlobalStyles } from '@style/globalStyles'
import { theme } from '@style/theme'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from './App'
import { EditingMessageProvider } from './shared/context/editingMessage/EditingMessageContext'

const root = ReactDOM.createRoot(document.getElementById('root')!)
const queryClient = new QueryClient()

OpenAPI.BASE = process.env.REACT_APP_API_URL!

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SocketProvider>
          <EditingMessageProvider>
            <GlobalStyles />
            <App />
          </EditingMessageProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>,
)
