import {
  ChannelsControllerService,
  SuccessResponse,
  TCreateChannelData,
  TeamViewData,
  TeamsControllerService,
  UsersControllerService,
} from '@api'
import { useGetCurrentUser } from '@queries'
import { CommonError } from '@commonTypes/errorTypes'
import { Routes } from '@constants'
import { AccountBox, ArrowDropDown, Logout, Person } from '@mui/icons-material'
import { AuthContext } from '@context'
import { Avatar } from 'src/components/Avatar/Avatar.component'
import AddIcon from '@mui/icons-material/Add'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ViewListIcon from '@mui/icons-material/ViewList'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { TeamContext } from 'src/shared/context/team/TeamContext'
import {
  AddMembersModal,
  CreateChannelModal,
  ViewMembersModal,
} from 'src/shared/modals'

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { getTeamById, teamsList, refetchTeams } = useContext(TeamContext)

  const { currentUser, refetch: refetchCurrentUser } = useGetCurrentUser()
  const [expanded, setExpanded] = useState(false)
  const [expandedProfile, setExpandedProfile] = useState(false)

  const updateAvatar = useMutation(
    'update-avatar',
    (file: Blob) =>
      UsersControllerService.usersControllerUploadFile({ formData: { file } }),
    {
      onSuccess: () => {
        refetchCurrentUser()

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
          fileInputRef.current.type = 'text'
          fileInputRef.current.type = 'file'
        }
      },
    },
  )

  const profileRef = useRef(null)

  const teamExpandRef = useRef<HTMLDivElement>(null)

  const createChannel = useMutation<
    SuccessResponse,
    CommonError,
    { requestBody: TCreateChannelData }
  >('create_channel', ChannelsControllerService.channelsControllerCreateChannel)

  const deleteTeam = useMutation<SuccessResponse, CommonError>(
    ['delete_team', teamId],
    () => TeamsControllerService.teamsControllerDeleteTeam({ teamId }),
  )

  const leaveTeam = useMutation<SuccessResponse, CommonError>(
    ['leave_team', teamId, currentUser?._id],
    () =>
      TeamsControllerService.teamsControllerRemoveTeamMember({
        teamId,
        memberId: currentUser?._id,
      }),
  )

  const handleDeleteTeam = async (): Promise<void> => {
    deleteTeam.mutate({} as unknown as void, {
      onSuccess: () => {
        refetchTeams()
      },
    })
  }

  const handleLeaveTeam = async (): Promise<void> => {
    leaveTeam.mutate({} as unknown as void, {
      onSuccess: () => {
        refetchTeams()
      },
    })
  }

  const handleFileUploaded = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = e.currentTarget.files?.[0]

    if (file) {
      updateAvatar.mutate(file)
    }
  }

  const handleChangeAvatar = (): void => {
    fileInputRef.current?.click()
  }

  const navigate = useNavigate()

  const [openChannelModal, setOpenChannelModal] = useState(false)
  const [openMembersModal, setOpenMembersModal] = useState(false)
  const [openAddMembersModal, setOpenAddMembersModal] = useState(false)

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

  const isOwner = currentTeam?.owner === currentUser?._id

  if (!currentTeam || !teamsList) {
    return <Navigate to={Routes.Home} />
  }

  return (
    <Main>
      <Header>
        <Title>WBChat</Title>
        <Divider orientation='vertical' />
        <Box
          display='flex'
          gap='12px'
          sx={{ overflowX: 'auto', alignItems: 'center' }}
        >
          {teamsList.map((team: TeamViewData) => {
            return (
              <Link to={`/team/${team._id}`} key={team._id}>
                <Button
                  variant='contained'
                  sx={{
                    outline: teamId === team._id ? '3px solid #086be6' : 'none',
                    outlineOffset: '-3px',
                  }}
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
        <Box display='flex' alignItems='center' sx={{ cursor: 'pointer' }}>
          <IconButton
            sx={{ borderRadius: 0, p: '5px' }}
            ref={profileRef}
            onClick={() => setExpandedProfile(true)}
          >
            <ArrowDropDown fontSize='large' />
            <Avatar
              id={currentUser?.avatar}
              username={currentUser?.username ?? ''}
              size={40}
            />
          </IconButton>
          <Menu
            open={expandedProfile}
            onClose={() => setExpandedProfile(false)}
            anchorEl={() => profileRef.current!}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem sx={{ display: 'flex', gap: 1, cursor: 'default' }}>
              <Person color='primary' />
              <Typography fontSize={17} fontWeight={800} color='primary'>
                {currentUser?.username}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{ display: 'flex', gap: 1 }}
              onClick={handleChangeAvatar}
            >
              <AccountBox />
              Change avatar
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem sx={{ display: 'flex', gap: 1 }} onClick={logout}>
              <Logout color='error' />
              <Typography color='error'>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Header>
      <ContentBox>
        <Sidebar>
          <Header>
            <Typography fontWeight={700} fontSize={18}>
              {currentTeam.name}
            </Typography>
            <div ref={teamExpandRef}>
              <ExpandMoreIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => setExpanded(!expanded)}
              />
            </div>

            <Menu
              open={expanded}
              onClose={() => setExpanded(false)}
              anchorEl={() => teamExpandRef.current!}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              sx={{ marginLeft: '20px', mt: '5px' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                sx={{ display: 'flex', gap: 1 }}
                onClick={() => setOpenMembersModal(true)}
              >
                <ViewListIcon />
                View members
              </MenuItem>
              {isOwner && (
                <MenuItem
                  sx={{ display: 'flex', gap: 1 }}
                  onClick={() => setOpenAddMembersModal(true)}
                >
                  <AddIcon />
                  Add members
                </MenuItem>
              )}
              <Divider sx={{ my: 0.5 }} />
              {currentTeam.owner !== currentUser?._id ? (
                <MenuItem
                  sx={{ display: 'flex', gap: 1 }}
                  onClick={handleLeaveTeam}
                >
                  <ExitToAppIcon color='error' />
                  <Typography color='error'>Leave team</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  sx={{ display: 'flex', gap: 1 }}
                  onClick={handleDeleteTeam}
                >
                  <DeleteIcon color='error' />
                  <Typography color='error'>Delete team</Typography>
                </MenuItem>
              )}
            </Menu>
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
        error={createChannel.error?.body?.message}
      />
      <ViewMembersModal
        open={openMembersModal}
        handleClose={() => setOpenMembersModal(false)}
      />
      <AddMembersModal
        open={openAddMembersModal}
        handleClose={() => setOpenAddMembersModal(false)}
      />
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileUploaded}
        style={{ display: 'none' }}
      />
    </Main>
  )
}
