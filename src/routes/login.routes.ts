import { Router } from 'express'
import AuthenticateService from '../services/AuthenticateService'

const routes = Router()

routes.post('/', async (req, res) => {
  try {
    const { token } = await new AuthenticateService().execute(req.body)
    return res.json({ token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default routes
