/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilterModel } from '../models/FilterModel'
import type { UsersListResponse } from '../models/UsersListResponse'
import type { UserViewData } from '../models/UserViewData'

import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

export class UsersControllerService {
  /**
   * @returns UsersListResponse
   * @throws ApiError
   */
  public static usersControllerGetUsersList({
    direct,
    page,
    pageSize,
    filter,
    searchValue,
    searchFields,
  }: {
    direct?: boolean
    page?: number
    pageSize?: number
    filter?: Array<FilterModel>
    searchValue?: string
    searchFields?: Array<string>
  }): CancelablePromise<UsersListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/list',
      query: {
        direct: direct,
        page: page,
        pageSize: pageSize,
        filter: filter,
        searchValue: searchValue,
        searchFields: searchFields,
      },
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }

  /**
   * @returns UserViewData
   * @throws ApiError
   */
  public static usersControllerGetUser({
    id,
  }: {
    id: string
  }): CancelablePromise<UserViewData> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/user',
      query: {
        id: id,
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
  public static usersControllerUpdateAvatar({
    formData,
  }: {
    formData: {
      file?: Blob
    }
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users/change-user-avatar',
      formData: formData,
      mediaType: 'multipart/form-data',
    })
  }
}
