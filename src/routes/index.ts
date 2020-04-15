import { Router } from 'express'
import appointmentRouter from './appointments.routes'

const router = Router()

router.get('/', (req, res) =>
  res.json({ message: `Connected to node API ${new Date().toISOString()}` })
)

router.use('/appointments', appointmentRouter)

export default router
