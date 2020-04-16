import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { IRequest, IResponse } from '../@types/login.types'
import User from '../models/User'

export default class AuthenticateService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await getRepository(User).findOne({
      select: ['id', 'email', 'password'],
      where: { email }
    })

    if (!user || !(await compare(password, user.password))) {
      throw new Error('Invalid email or password.')
    }

    return {
      token: sign({ id: user.id, email }, process.env.JWT_SECRET || '', {
        subject: user.id,
        expiresIn: '1d'
      })
    }
  }
}
