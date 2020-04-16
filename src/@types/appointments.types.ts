export interface IAppointment {
  id: string
  provider: string
  date: Date
}

export interface IRequest {
  provider_id: string
  date: Date
}
