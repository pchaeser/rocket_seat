import { Router } from 'express'
import { getRepository } from 'typeorm'
import multer from 'multer'
import uploadConfig from '../config/upload'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import User from '../models/User'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', async (req, res) => {
  const users = await getRepository(User).find()
  res.json(users.map(({ password, ...user }) => user))
})

routes.post('/', async (req, res) => {
  const { name, email, password } = req.body

  return res.json(
    await new CreateUserService().execute({ name, email, password })
  )
})

routes.patch('/avatar', upload.single('avatar'), async (req, res) => {
  return res.json(
    await new UpdateUserAvatarService().execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    })
  )
})

export default routes
