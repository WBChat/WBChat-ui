import { UseQueryResult, useQuery } from "react-query"
import { MessagesControllerService, Message, AttachmentsService, GetFilesByIdsResponse } from "@api"

interface Props {
    channelId: string;
    onSuccess: (data: Message[]) => void;
}

export const useGetMessages = (props: Props): UseQueryResult => {
    const query = useQuery(
        ['get-messages', props.channelId],
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

export const usePostFiles = (props: {ids: string[]}): UseQueryResult<GetFilesByIdsResponse[]> => {
  const query = useQuery(
      ['get-post-files', props.ids],
      () => {
        if (!props.ids.length) {
          return []
        }
        
        return AttachmentsService.filesControllerGetFiles({ ids: props.ids })
      },
      {
        refetchOnWindowFocus: false,
      },
    )

  return query
}