import { ApiError, TErrorResponseBody } from '../api'

export interface CommonError extends ApiError {
  body: TErrorResponseBody
}
