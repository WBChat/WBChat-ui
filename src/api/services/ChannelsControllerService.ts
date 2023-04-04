/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
import type { ChannelListResponse } from '../models/ChannelListResponse'

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
}
