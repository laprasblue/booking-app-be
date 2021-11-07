import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface User {
  username: string
  iat: number
  exp: number
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader: string = req.headers['authorization'] || ''
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null || token === '') {
    res.sendStatus(401)
    return
  }
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || ''
    const user = (await verify(token, secret)) as User
    res.locals.username = user.username
    next()
  } catch (error) {
    console.log(`Error authenticate token: ${error}`)
    res.sendStatus(503)
    return
  }
  next()
}
