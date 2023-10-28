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

  /**
   * @returns any
   * @throws ApiError
   */
  public static messagesControllerDeleteMessage({
    messageId,
  }: {
    messageId: string
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/messages/message/delete',
      query: {
        messageId: messageId,
      },
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static messagesControllerEditMessage({
    text,
    messageId,
  }: {
    text: string
    messageId: string
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/messages/message/edit',
      query: {
        text: text,
        messageId: messageId,
      },
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }
}
