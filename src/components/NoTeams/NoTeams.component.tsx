import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import {
  Container,
  Header,
} from 'src/shared/layouts/MainLayout/MainLayout.styles'

import { Plans } from '../Plans/Plans.component'

export const NoTeams: React.FC = () => {
  return (
    <Container style={{ minHeight: '100vh' }}>
      <Header>
        <Box
          sx={{
            color: 'white',
            fontSize: '24px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          Ask someone to add you to team or create your own
        </Box>
      </Header>
      <Box sx={{ margin: '128px 0' }}>
        <Plans />
      </Box>
    </Container>
  )
}
