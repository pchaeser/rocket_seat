import { Router } from 'express'
import AuthenticateService from '../services/AuthenticateService'

const routes = Router()

routes.post('/', async (req, res) => {
  const { token } = await new AuthenticateService().execute(req.body)

  return res.json({ token })
})

export default routes
