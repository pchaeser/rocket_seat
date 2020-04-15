import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const routes = Router()
const appointmentsRepository = new AppointmentsRepository()

routes.get('/', (req, res) => res.json(appointmentsRepository.findAll()))

routes.post('/', (req, res) => {
  const { provider, date } = req.body

  try {
    const parsedDate = parseISO(date)
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    )

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider
    })

    return res.json(appointment)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
})

export default routes
