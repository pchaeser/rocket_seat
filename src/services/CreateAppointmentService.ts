import { startOfHour } from 'date-fns'
import { IRequest } from '../types/appointments.types'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: IRequest): Appointment {
    const appointmentDate = startOfHour(date)

    if (this.appointmentsRepository.findByDate(appointmentDate) !== null) {
      throw new Error('This appointment slot is already booked!')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}
