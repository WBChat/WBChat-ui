import { TeamListResponse, TeamViewData } from '@api'
import { CircularProgress } from '@mui/material'
import { useGetMyTeams } from '@queries'
import { createContext, useCallback, useMemo } from 'react'
import { QueryObserverResult } from 'react-query'
import { Container } from 'src/shared/layouts/MainLayout/MainLayout.styles'

interface ContextType {
  teamsList?: TeamViewData[]
  getTeamById: (teamId: string) => TeamViewData | undefined
  refetchTeams: () => Promise<QueryObserverResult<TeamListResponse, unknown>>
}

export const TeamContext = createContext<ContextType>({
  teamsList: undefined,
  getTeamById: () => undefined,
  refetchTeams: async () =>
    ({}) as QueryObserverResult<TeamListResponse, unknown>,
})

interface Props {
  children: React.ReactNode
}

export const TeamProvider: React.FC<Props> = ({ children }) => {
  const { data, isFetching, refetch } = useGetMyTeams()

  const getTeamById = useCallback(
    (teamId: string): TeamViewData | undefined => {
      return data?.teams.find((team: TeamViewData) => team._id === teamId)
    },
    [data],
  )

  const value = useMemo(() => {
    return {
      teamsList: data?.teams,
      getTeamById,
      refetchTeams: refetch,
    }
  }, [data, getTeamById])

  if (isFetching) {
    return (
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={64} />
      </Container>
    )
  }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}
