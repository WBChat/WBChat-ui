/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TCreateLicenseKey } from '../models/TCreateLicenseKey'
import type { TCreateTeamData } from '../models/TCreateTeamData'
import type { TeamListResponse } from '../models/TeamListResponse'
import type { UserViewData } from '../models/UserViewData'

import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

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

  /**
   * @returns any
   * @throws ApiError
   */
  public static teamsControllerSendLicenseKey(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/teams/send_email/license_key',
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
  public static teamsControllerGetTeamMembers({
    teamId,
  }: {
    teamId?: string
  }): CancelablePromise<Array<UserViewData>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/teams/team/members',
      query: {
        teamId: teamId,
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
  public static teamsControllerAddTeamMember({
    memberId,
    teamId,
  }: {
    memberId?: string
    teamId?: string
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/teams/team/add_member',
      query: {
        memberId: memberId,
        teamId: teamId,
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
  public static teamsControllerRemoveTeamMember({
    memberId,
    teamId,
  }: {
    memberId?: string
    teamId?: string
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/teams/team/remove_member',
      query: {
        memberId: memberId,
        teamId: teamId,
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
  public static teamsControllerDeleteTeam({
    teamId,
  }: {
    teamId?: string
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/teams/team/delete',
      query: {
        teamId: teamId,
      },
      errors: {
        400: `Bad request`,
        401: `Unauthorized`,
        500: `Internal server error`,
      },
    })
  }
}
