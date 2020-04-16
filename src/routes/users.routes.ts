import { Router } from 'express'
import { getRepository } from 'typeorm'
import CreateUserService from '../services/CreateUserService'
import User from '../models/User'

const routes = Router()

routes.get('/', async (req, res) => {
  try {
    const users = await getRepository(User).find()
    res.json(users.map(({ password, ...user }) => user))
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

routes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body

    return res.json(
      await new CreateUserService().execute({ name, email, password })
    )
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default routes
