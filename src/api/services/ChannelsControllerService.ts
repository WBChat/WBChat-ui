/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
import type { ChannelListResponse } from '../models/ChannelListResponse'
import type { ChannelViewData } from '../models/ChannelViewData'

export class ChannelsControllerService {
  /**
   * @returns ChannelListResponse
   * @throws ApiError
   */
  public static channelsControllerGetMyChannels(): CancelablePromise<ChannelListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/channels/my/list',
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }

  /**
   * @returns ChannelViewData
   * @throws ApiError
   */
  public static channelsControllerGetChannelById({
    channelId,
  }: {
    channelId: string
  }): CancelablePromise<ChannelViewData> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/channels/get/channel',
      query: {
        channelId: channelId,
      },
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }
}
