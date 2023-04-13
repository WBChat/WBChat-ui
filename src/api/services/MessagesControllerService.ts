/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
import type { FilterModel } from '../models/FilterModel'
import type { Message } from '../models/Message'
import type { SearchModel } from '../models/SearchModel'

export class MessagesControllerService {
  /**
   * @returns Message
   * @throws ApiError
   */
  public static messagesControllerGetChannelMessages({
    channelId,
    page,
    pageSize,
    filter,
    search,
  }: {
    channelId: string
    page?: number
    pageSize?: number
    filter?: Array<FilterModel>
    search?: SearchModel
  }): CancelablePromise<Array<Message>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/channel-messages',
      query: {
        channelId: channelId,
        page: page,
        pageSize: pageSize,
        filter: filter,
        search: search,
      },
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }
}
