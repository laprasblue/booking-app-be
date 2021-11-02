import { compare, hash } from 'bcrypt'
import User, { UserAttributes } from '../models/user.model'

interface returnTemplate {
  status: boolean
  detail: string
}

export const findOneUser = async (column: string, value: string): Promise<boolean> => {
  const record = await User.findOne({ where: { [column]: value } })
  if (record) {
    return true
  } else return false
}

export const insertOneUser = async (
  username: string,
  password: string,
  email: string
): Promise<UserAttributes | boolean> => {
  try {
    const hashPassword = await hash(password, 10)
    const record = await User.create({ username, password: hashPassword, email })
    return record
  } catch (error) {
    console.log('Error when insertOneUser: ', error)
    return false
  }
}

export const updatePassword = async (
  username: string,
  password: string,
  oldPassword: string
): Promise<returnTemplate> => {
  try {
    const user = await User.findOne({ where: { username } })

    // check username
    if (!user)
      return {
        status: typeof user === null,
        detail: 'Username is not existed'
      }

    // check password
    const compareResult = await compare(oldPassword, user.password)
    if (!compareResult)
      return {
        status: false,
        detail: 'Old password is wrong!!!'
      }
    // update password

    const hashPassword = await hash(password, 10)
    await User.update(
      { password: hashPassword },
      {
        where: {
          username
        }
      }
    )
    return {
      status: true,
      detail: 'Updated password successfully'
    }
  } catch (error) {
    console.log(`Error when update password: ${error}`)
    return {
      status: false,
      detail: ''
    }
  }
}
