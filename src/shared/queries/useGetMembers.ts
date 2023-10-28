import { UseQueryResult, useQuery } from "react-query"
import { UsersControllerService, ChannelViewData, UserViewData } from "@api"

interface Props {
    channelInfo?: ChannelViewData;
}

export const useGetMembers = (props: Props): UseQueryResult<Record<string, UserViewData>> => {
    const query = useQuery(
        ['get-members', props.channelInfo],
        async () => {
          let users = []
    
          if (props.channelInfo?.isCommon) {
            users = (await UsersControllerService.usersControllerGetUsersList({}))
              .list
          }
    
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