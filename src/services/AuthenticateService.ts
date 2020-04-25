import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { IRequest, IResponse } from '../@types/login.types'
import User from '../models/User'
import AppError from '../errors/AppError'

export default class AuthenticateService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await getRepository(User).findOne({
      select: ['id', 'email', 'password'],
      where: { email }
    })

    if (!user || !(await compare(password, user.password))) {
      throw new AppError('Invalid email or password.', 401)
    }

    return {
      token: sign({ id: user.id, email }, process.env.JWT_SECRET || '', {
        subject: user.id,
        expiresIn: '1d'
      })
    }
  }
}
