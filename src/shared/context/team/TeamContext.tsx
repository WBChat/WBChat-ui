import { TeamViewData } from '@api'
import { useGetMyTeams } from '@queries'
import { createContext, useCallback, useMemo } from 'react'

interface ContextType {
  teamsList?: TeamViewData[]
  getTeamById: (teamId: string) => TeamViewData | undefined
  refetchTeams: () => void
}

export const TeamContext = createContext<ContextType>({
  teamsList: undefined,
  getTeamById: () => undefined,
  refetchTeams: () => {},
})

interface Props {
  children: React.ReactNode
}

export const TeamProvider: React.FC<Props> = ({ children }) => {
  const { data, isFetching, refetch, error } = useGetMyTeams()

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

  if (isFetching && !error) {
    return null
  }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}
