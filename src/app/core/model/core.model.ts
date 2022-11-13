export interface BaseResponse<D = {}> {
  data: D
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}
export interface MeResponse {
  data: {
    id: number
    login: string
    email: string
  }
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
}
