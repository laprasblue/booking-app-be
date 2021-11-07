import { Response } from 'express'

export const returnBadRequestOr503 = (res: Response, message: string): void => {
  if (message !== '') {
    res.status(400).json({
      message: message
    })
    return
  } else {
    res.sendStatus(503)
    return
  }
}
