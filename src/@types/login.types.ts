export interface IRequest {
  email: string
  password: string
}

export interface IResponse {
  token: string
}

export interface ITokenPayload {
  id: string
  email: string
  exp: number
  iat: number
  sub: string
}
