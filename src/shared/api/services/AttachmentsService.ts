/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetFilesByIdsResponse } from '../models/GetFilesByIdsResponse'

import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

export class AttachmentsService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static filesControllerUploadFile({
    formData,
  }: {
    formData: {
      file?: Blob
    }
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/attachment/files/upload',
      formData: formData,
      mediaType: 'multipart/form-data',
    })
  }

  /**
   * @returns GetFilesByIdsResponse
   * @throws ApiError
   */
  public static filesControllerGetFiles({
    ids,
  }: {
    ids: Array<string>
  }): CancelablePromise<Array<GetFilesByIdsResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/attachment/files/get-by-ids',
      query: {
        ids: ids,
      },
    })
  }

  /**
   * @returns any The file has been successfully downloaded.
   * @throws ApiError
   */
  public static filesControllerDownloadFile({
    id,
  }: {
    id: string
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/attachment/files/download-file',
      query: {
        id: id,
      },
      errors: {
        404: `File not found.`,
        500: `Internal server error.`,
      },
    })
  }
}
