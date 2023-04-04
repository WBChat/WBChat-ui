import { ChannelsControllerService } from '@api'
import { AuthContext } from '@context'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, CircularProgress, ToggleButtonGroup } from '@mui/material'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Routes } from 'src/constants/routes'

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
  ToggleButton,
} from './MainLayout.styles'
import { SidebarMode } from './MainLayout.types'

export const MainLayout: React.FC = () => {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(
    SidebarMode.Channels,
  )
  const { logout } = useContext(AuthContext)
  const { channelId } = useParams()

  const { data: channelsData, isFetching: channelsLoading } = useQuery(
    'channels-list',
    () => {
      return ChannelsControllerService.channelsControllerGetMyChannels()
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  const { commonChannels, activeChannels } = useMemo(() => {
    return {
      commonChannels: channelsData?.channels.filter(
        channel => channel.isCommon,
      ),
      activeChannels: channelsData?.channels.filter(
        channel => !channel.isCommon,
      ),
    }
  }, [channelsData])

  const handleSidebarModeChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, value: SidebarMode) => {
      setSidebarMode(value)
    },
    [],
  )

  return (
    <Main>
      <Header>
        <Title>WBChat</Title>
        <Button variant='text' onClick={logout}>
          Logout
        </Button>
      </Header>
      <ContentBox>
        <Sidebar>
          <ToggleButtonGroup
            size='small'
            exclusive
            value={sidebarMode}
            onChange={handleSidebarModeChange}
          >
            <ToggleButton value={SidebarMode.Channels}>
              {SidebarMode.Channels}
            </ToggleButton>
            <ToggleButton value={SidebarMode.Direct} disabled>
              {SidebarMode.Direct}
            </ToggleButton>
          </ToggleButtonGroup>
          {channelsLoading ? (
            <CircularProgress sx={{ m: '16px auto' }} />
          ) : (
            <List>
              <ListGroup defaultExpanded>
                <ListGroupSummary expandIcon={<ExpandMoreIcon />}>
                  Common channels
                </ListGroupSummary>
                <ListGroupDetails>
                  {commonChannels?.map(channel => {
                    return (
                      <Link
                        to={`${Routes.Channel}/${channel._id}`}
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

              {activeChannels?.length ? (
                <ListGroup defaultExpanded>
                  <ListGroupSummary expandIcon={<ExpandMoreIcon />}>
                    Active channels
                  </ListGroupSummary>
                  <ListGroupDetails>
                    {activeChannels?.map(channel => {
                      return (
                        <Link
                          to={`${Routes.Channel}/${channel._id}`}
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
              ) : null}
            </List>
          )}
        </Sidebar>
        <Container>
          <Outlet />
        </Container>
      </ContentBox>
    </Main>
  )
}
