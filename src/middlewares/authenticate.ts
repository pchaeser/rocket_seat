import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { ITokenPayload } from '../@types/login.types'
import AppError from '../errors/AppError'

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token was not provided.', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, process.env.JWT_SECRET || '')
    const { sub } = decoded as ITokenPayload
    req.user = { id: sub }

    return next()
  } catch {
    throw new AppError('Invalid JWT token.', 401)
  }
}
