import { isEqual } from 'date-fns'
import { ICreateAppointmentDTO } from '../types/appointments.types'
import Appointment from '../models/Appointment'

export default class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public findAll(): Array<Appointment> {
    return this.appointments
  }

  public create({ provider, date }: ICreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date })
    this.appointments.push(appointment)

    return appointment
  }

  public findByDate(parsedDate: Date): Appointment | null {
    const appointment = this.appointments.find(({ date }) =>
      isEqual(parsedDate, date)
    )

    return appointment || null
  }
}
