/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
import type { FilterModel } from '../models/FilterModel'
import type { SearchModel } from '../models/SearchModel'
import type { UsersListResponse } from '../models/UsersListResponse'

export class UsersControllerService {
  /**
   * @returns UsersListResponse
   * @throws ApiError
   */
  public static usersControllerGetUsersList({
    page,
    pageSize,
    filter,
    search,
  }: {
    page?: number
    pageSize?: number
    filter?: Array<FilterModel>
    search?: SearchModel
  }): CancelablePromise<UsersListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/list',
      query: {
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
