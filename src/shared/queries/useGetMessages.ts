import { UseQueryResult, useQuery } from "react-query"
import { MessagesControllerService, Message } from "@api"

interface Props {
    channelId: string;
    onSuccess: (data: Message[]) => void;
}

export const useGetMessages = (props: Props): UseQueryResult => {
    const query = useQuery(
        'get-messages',
        () => {
          return MessagesControllerService.messagesControllerGetChannelMessages({
            channelId: props.channelId,
          })
        },
        {
          onSuccess: props.onSuccess,
          refetchOnWindowFocus: false,
        },
      )

    return query
}