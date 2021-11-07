import { Request, Response } from 'express'
import { findOneUser, insertOneUser, updatePassword } from '../services/user.service'
import { returnBadRequestOr503 } from './common'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body
  try {
    const hasUsername = await findOneUser('username', username)
    const hasEmail = await findOneUser('email', email)
    if (hasUsername) {
      res.status(400).json({
        message: 'Username is existed'
      })
      return
    }
    if (hasEmail) {
      res.status(400).json({
        message: 'Email is used'
      })
      return
    }
    const userRecord = await insertOneUser(username, password, email)
    if (typeof userRecord !== 'boolean') {
      res.status(201).json({
        message: 'Created a user',
        username: userRecord.username,
        email: userRecord.email
      })
      return
    } else {
      res.sendStatus(503)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(503)
    return
  }
}

export const changePasswordUser = async (req: Request, res: Response): Promise<void> => {
  const { username, oldPassword, password } = req.body
  try {
    const query = await updatePassword(username, password, oldPassword)
    if (query.status) {
      res.status(201).json({
        message: query.message
      })
      return
    }
    returnBadRequestOr503(res, query.message)
  } catch (error) {
    console.log('Error Change the password: ', error)
    res.sendStatus(503)
    return
  }
}
