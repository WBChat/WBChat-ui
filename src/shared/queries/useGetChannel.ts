import { UseQueryResult, useQuery } from "react-query"
import { ChannelViewData, ChannelsControllerService } from "@api"

interface Props {
    channelId: string;
}

export const useGetChannel = (props: Props): UseQueryResult<ChannelViewData> => {
    const query = useQuery(
        ['get-channel', props.channelId],
        () => {
          return ChannelsControllerService.channelsControllerGetChannelById({
            channelId: props.channelId,
          })
        },
        {
          refetchOnWindowFocus: false,
        },
      )

    return query
}