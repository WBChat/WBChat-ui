import { TCreateTeamData, TeamsControllerService } from '@api'
import { CommonError } from '@commonTypes/errorTypes'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useGetCurrentUser } from '@queries'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { TeamContext } from 'src/shared/context/team/TeamContext'
import { CreateTeamModal } from 'src/shared/modals/CreateTeamModal'

export const Plans: React.FC = () => {
  const { refetchTeams } = useContext(TeamContext)
  const [openModal, setOpenModal] = useState(false)

  const createTeam = useMutation<
    string,
    CommonError,
    { requestBody: TCreateTeamData }
  >('create_team', TeamsControllerService.teamsControllerCreateTeam)

  const { currentUser } = useGetCurrentUser()
  const navigate = useNavigate()

  const handleTeamModalSubmit = (key: string, name: string): void => {
    createTeam.mutate(
      { requestBody: { license_key: key, teamName: name } },
      {
        onSuccess: async teamId => {
          setOpenModal(false)
          await refetchTeams()
          navigate(`/team/${teamId}`)
        },
      },
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        flexDirection: 'row',
      }}
    >
      <Card sx={{ padding: '24px' }}>
        <CardContent>
          <Typography fontSize={26} fontWeight={900}>
            Demo plan
          </Typography>
          <Typography fontSize={15} color='text.secondary'>
            50 members max
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='large'
            variant='contained'
            sx={{ width: '160px' }}
            onClick={() => setOpenModal(true)}
          >
            Get for free
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ padding: '24px' }}>
        <CardContent>
          <Typography fontSize={26} fontWeight={900}>
            Starter plan
          </Typography>
          <Typography fontSize={15} color='text.secondary'>
            250 members max
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='large'
            variant='contained'
            sx={{ width: '160px' }}
            disabled
          >
            Get for 5$
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ padding: '24px' }}>
        <CardContent>
          <Typography fontSize={26} fontWeight={900}>
            Pro plan
          </Typography>
          <Typography fontSize={15} color='text.secondary'>
            250+ members
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='large'
            variant='contained'
            sx={{ width: '160px' }}
            disabled
          >
            Get for 25$
          </Button>
        </CardActions>
      </Card>
      <CreateTeamModal
        open={openModal}
        emailSent={currentUser?.email}
        handleClose={() => setOpenModal(false)}
        handleSubmit={handleTeamModalSubmit}
        loading={createTeam.isLoading}
        error={createTeam.error?.body?.message}
      />
    </Box>
  )
}
