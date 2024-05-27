import { UseQueryResult, useQuery } from 'react-query'
import {
  UsersControllerService,
  UserViewData,
  TeamsControllerService,
  FilterModel,
  UsersListResponse,
} from '@api'

export const useGetPeople = (props: {
  page?: number
  pageSize?: number
  filter?: FilterModel[]
  searchValue?: string
  searchFields?: string[]
}): UseQueryResult<UsersListResponse> => {
  const query = useQuery(
    ['get-people', props.searchValue, props.searchFields, props.page, props.filter, props.pageSize],
    () => {
      return UsersControllerService.usersControllerGetUsersList(props)
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

export const useGetTeamMembers = (props: {
  teamId: string
}): UseQueryResult<UserViewData[]> => {
  const query = useQuery(
    ['get-team-members', props.teamId],
    () => {
      return TeamsControllerService.teamsControllerGetTeamMembers({
        teamId: props.teamId,
      })
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}
