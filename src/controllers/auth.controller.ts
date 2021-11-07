import { Request, Response } from 'express'
import { createToken } from '../middlewares/authentication/createToken'
import { loginUser } from '../services/auth.service'
import { returnBadRequestOr503 } from './common'

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body
  try {
    const query = await loginUser(username, password)
    const token = await createToken(username)
    if (query.status) {
      res.status(200).json({
        message: query.message,
        username: query.user?.username,
        token: token
      })
      return
    }
    returnBadRequestOr503(res, query.message)
  } catch (error) {
    console.log('Error login action: ', error)
    res.sendStatus(503)
    return
  }
}
