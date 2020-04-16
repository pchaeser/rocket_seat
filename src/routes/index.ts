import { Router } from 'express'
import appointmentRouter from './appointments.routes'
import userRouter from './users.routes'
import loginRouter from './login.routes'
import authenticate from '../middlewares/authenticate'

const router = Router()

router.get('/', (req, res) =>
  res.json({ message: `Connected to node API ${new Date().toISOString()}` })
)

router.use('/login', loginRouter)

router.use(authenticate)
router.use('/appointments', appointmentRouter)
router.use('/users', userRouter)

export default router
