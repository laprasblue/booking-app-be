import { compare } from 'bcrypt'
import User, { UserAttributes } from '../models/user.model'

interface ReturnTemplate {
  status: boolean
  message: string
  user?: UserAttributes
}
export const loginUser = async (username: string, password: string): Promise<ReturnTemplate> => {
  try {
    const user = await User.findOne({ where: { username } })
    if (!user)
      return {
        status: false,
        message: 'Username is not existed!!!'
      }

    const hasMatch = await compare(password, user.password)
    if (hasMatch) {
      return {
        status: true,
        message: 'Authenticate successfully',
        user: user
      }
    } else
      return {
        status: false,
        message: 'Wrong password!!!'
      }
  } catch (error) {
    console.log(`Error when update password: ${error}`)
    return {
      status: false,
      message: ''
    }
  }
}
