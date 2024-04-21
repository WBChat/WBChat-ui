import {
  ChannelsControllerService,
  SuccessResponse,
  TCreateChannelData,
  TCreateTeamData,
  TeamViewData,
  TeamsControllerService,
} from '@api'
import { CommonError } from '@commonTypes/errorTypes'
import { Routes } from '@constants'
import { AuthContext } from '@context'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import { TeamContext } from 'src/shared/context/team/TeamContext'
import { CreateChannelModal } from 'src/shared/modals'

import {
  ChannelListItem,
  Container,
  ContentBox,
  Header,
  List,
  ListGroup,
  ListGroupDetails,
  ListGroupSummary,
  Main,
  Sidebar,
  Title,
} from './MainLayout.styles'

export const MainLayout: React.FC = () => {
  const { logout } = useContext(AuthContext)
  const { channelId, teamId } = useParams()

  const createChannel = useMutation<
    SuccessResponse,
    CommonError,
    { requestBody: TCreateChannelData }
  >('create_channel', ChannelsControllerService.channelsControllerCreateChannel)

  const createTeam = useMutation<
    SuccessResponse,
    CommonError,
    { requestBody: TCreateTeamData }
  >('create_team', TeamsControllerService.teamsControllerCreateTeam)

  const { getTeamById, teamsList, refetchTeams } = useContext(TeamContext)

  const navigate = useNavigate()

  const [openChannelModal, setOpenChannelModal] = useState(false)

  const {
    data: channelsData,
    isFetching: channelsLoading,
    refetch,
  } = useQuery(
    ['channels-list', teamId],
    () => {
      return ChannelsControllerService.channelsControllerGetMyChannels({
        teamId: teamId ?? '',
      })
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  const handleAddChannelClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setOpenChannelModal(true)
  }

  const handleCreateTeamClick = (): void => {
    navigate(Routes.CreateTeam)
  }

  const handleChannelModalSubmit = (channelName: string): void => {
    createChannel.mutate(
      { requestBody: { channelName, teamId: teamId ?? '' } },
      {
        onSuccess: () => {
          refetch()
          setOpenChannelModal(false)
        },
      },
    )
  }

  const currentTeam = getTeamById(teamId ?? '')

  if (!currentTeam || !teamsList) {
    return <Navigate to={Routes.Home} />
  }

  return (
    <Main>
      <Header>
        <Title>WBChat</Title>
        <Divider orientation='vertical' />
        <Box display='flex' gap='12px' sx={{ overflowX: 'auto' }}>
          {teamsList.map((team: TeamViewData) => {
            return (
              <Link to={`/team/${team._id}`}>
                <Button
                  variant='contained'
                  color={teamId === team._id ? 'secondary' : undefined}
                >
                  {team.name}
                </Button>
              </Link>
            )
          })}
          <Button variant='outlined' onClick={handleCreateTeamClick}>
            Create team
          </Button>
        </Box>
        <Divider orientation='vertical' />
        <Button variant='text' onClick={logout}>
          Logout
        </Button>
      </Header>
      <ContentBox>
        <Sidebar>
          <Header>
            <Typography fontWeight={700} fontSize={18}>
              {currentTeam.name}
            </Typography>
          </Header>
          {channelsLoading ? (
            <CircularProgress sx={{ m: '16px auto' }} />
          ) : (
            <List>
              <ListGroup defaultExpanded>
                <ListGroupSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    display='flex'
                    sx={{ width: '100%' }}
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    channels
                    <IconButton
                      size='small'
                      sx={{ borderRadius: '4px', p: '1px' }}
                      onClick={handleAddChannelClick}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </ListGroupSummary>
                <ListGroupDetails>
                  {channelsData?.channels?.map(channel => {
                    return (
                      <Link
                        to={`team/${teamId}/channel/${channel._id}`}
                        key={channel._id}
                      >
                        <ChannelListItem active={channelId === channel._id}>
                          {channel.name}
                        </ChannelListItem>
                      </Link>
                    )
                  })}
                </ListGroupDetails>
              </ListGroup>
            </List>
          )}
        </Sidebar>
        <Container>
          <Outlet />
        </Container>
      </ContentBox>
      <CreateChannelModal
        open={openChannelModal}
        handleClose={() => setOpenChannelModal(false)}
        handleSubmit={handleChannelModalSubmit}
        loading={createChannel.isLoading}
      />
    </Main>
  )
}
