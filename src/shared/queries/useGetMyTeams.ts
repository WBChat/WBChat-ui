import { UseQueryResult, useQuery } from "react-query"
import { TeamListResponse, TeamsControllerService } from "@api"


export const useGetMyTeams = (): UseQueryResult<TeamListResponse> => {
    const query = useQuery(
        'get-my-teams',
        () => {
          return TeamsControllerService.teamsControllerGetMyTeams();
        },
        {
          refetchOnWindowFocus: false,
        },
      )

    return query
}