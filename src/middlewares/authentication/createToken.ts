import { sign } from 'jsonwebtoken'

export const createToken = async (username: string): Promise<string> => {
  const token = await sign({ username }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '1h' })
  return token
}
