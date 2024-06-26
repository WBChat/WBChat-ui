import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'
import {
  Container,
  Header,
} from 'src/shared/layouts/MainLayout/MainLayout.styles'

import { useContext } from 'react'
import { TeamContext } from 'src/shared/context/team/TeamContext'

import { Plans } from '../Plans/Plans.component'

export const NoTeams: React.FC = () => {
  const { teamsList } = useContext(TeamContext)

  if (teamsList?.length) {
    return <Navigate to={`/team/${teamsList[0]._id}/`} />
  }

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
