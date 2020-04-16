import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'
import { IRequest } from '../@types/users.types'

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User)
    const checkUserExists = await usersRepository.findOne({ where: { email } })

    if (checkUserExists) {
      throw new Error('This email is already in use. Choose another one.')
    }

    const hashedPassword = await hash(password, 8)

    return await usersRepository.save(
      usersRepository.create({
        name,
        email,
        password: hashedPassword
      })
    )
  }
}
