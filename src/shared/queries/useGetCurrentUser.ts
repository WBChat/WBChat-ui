import { UseQueryResult, useQuery } from "react-query"
import { UsersControllerService, UserViewData } from "@api"
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

export const useGetCurrentUser = (): UseQueryResult<UserViewData> => {
    const { userId } = useContext(AuthContext)

    const query = useQuery(
        ['get-current-user'],
        () => {
          return UsersControllerService.usersControllerGetUser({ id: userId ?? '' })
        },
        {
          refetchOnWindowFocus: false,
          cacheTime: Infinity
        },
      )

    return query
}