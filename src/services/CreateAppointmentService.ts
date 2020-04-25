import { getCustomRepository } from 'typeorm'
import { startOfHour } from 'date-fns'
import { IRequest } from '../@types/appointments.types'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

export default class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)

    if ((await appointmentsRepository.findByDate(appointmentDate)) !== null) {
      throw new AppError('This appointment slot is already booked!')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
