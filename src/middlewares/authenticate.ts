import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { ITokenPayload } from '../@types/login.types'

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('JWT token was not provided.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, process.env.JWT_SECRET || '')
    const { sub } = decoded as ITokenPayload
    req.user = { id: sub }

    return next()
  } catch {
    throw new Error('Invalid JWT token.')
  }
}
