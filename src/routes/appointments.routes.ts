import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const routes = Router()

routes.get('/', async (req: Request, res: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  return res.json(await appointmentsRepository.find())
})

routes.post('/', async (req: Request, res: Response) => {
  const { provider_id, date } = req.body

  try {
    const parsedDate = parseISO(date)
    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    })

    return res.json(appointment)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
})

export default routes
