import { SuccessResponse, TCreateTeamData, TeamsControllerService } from '@api'
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
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { CreateTeamModal } from 'src/shared/modals/CreateTeamModal'

export const Plans: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)

  const createTeam = useMutation<
    SuccessResponse,
    CommonError,
    { requestBody: TCreateTeamData }
  >('create_team', TeamsControllerService.teamsControllerCreateTeam)

  const { data: user } = useGetCurrentUser()

  const handleTeamModalSubmit = (key: string, name: string): void => {
    createTeam.mutate(
      { requestBody: { license_key: key, teamName: name } },
      {
        onSuccess: () => {
          setOpenModal(false)
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
        emailSent={user?.email}
        handleClose={() => setOpenModal(false)}
        handleSubmit={handleTeamModalSubmit}
        loading={createTeam.isLoading}
      />
    </Box>
  )
}
