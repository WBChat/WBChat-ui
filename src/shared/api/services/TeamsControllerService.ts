/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
import type { TCreateLicenseKey } from '../models/TCreateLicenseKey'
import type { TCreateTeamData } from '../models/TCreateTeamData'
import type { TeamListResponse } from '../models/TeamListResponse'

export class TeamsControllerService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static teamsControllerCreateTeam({
    requestBody,
  }: {
    requestBody: TCreateTeamData
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/teams/create/team',
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
   * @returns TeamListResponse
   * @throws ApiError
   */
  public static teamsControllerGetMyTeams(): CancelablePromise<TeamListResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/teams/my_teams',
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
  public static teamsControllerCreateLicenseKey({
    requestBody,
  }: {
    requestBody: TCreateLicenseKey
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/teams/create/license_key',
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
