/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Message = {
  _id: string
  sender: string
  channel_id: string
  text: string
  files: Array<string>
  sendedDate: number
  reactions?: any
}
