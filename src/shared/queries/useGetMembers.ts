import { UseQueryResult, useQuery } from 'react-query'
import {
  UsersControllerService,
  ChannelViewData,
  UserViewData,
  TeamsControllerService,
  FilterModel,
  UsersListResponse,
} from '@api'

interface Props {
  channelInfo?: ChannelViewData
}

export const useGetMembers = (
  props: Props,
): UseQueryResult<Record<string, UserViewData>> => {
  const query = useQuery(
    ['get-members', props.channelInfo],
    async () => {
      let users = []

      users = (await UsersControllerService.usersControllerGetUsersList({}))
        .list

      return users.reduce((acc, user) => {
        return { ...acc, [user._id]: user }
      }, {})
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

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
