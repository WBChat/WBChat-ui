/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TAuthResponseData } from '../models/TAuthResponseData'
import type { TLoginData } from '../models/TLoginData'
import type { TUserRegistration } from '../models/TUserRegistration'

import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

export class AuthorizationControllerService {
  /**
   * @returns TAuthResponseData
   * @throws ApiError
   */
  public static authControllerRegistration({
    requestBody,
  }: {
    requestBody: TUserRegistration
  }): CancelablePromise<TAuthResponseData> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/registration',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }

  /**
   * @returns TAuthResponseData
   * @throws ApiError
   */
  public static authControllerLogin({
    requestBody,
  }: {
    requestBody: TLoginData
  }): CancelablePromise<TAuthResponseData> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/login',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }
}
