export interface IAppointment {
  id: string
  provider: string
  date: Date
}

export interface ICreateAppointmentDTO {
  provider: string
  date: Date
}

export interface IRequest {
  provider: string
  date: Date
}
