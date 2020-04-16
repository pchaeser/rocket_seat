import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(parsedDate: Date): Promise<Appointment | null> {
    const appointment = await this.findOne({
      where: { date: parsedDate }
    })

    return appointment || null
  }
}
