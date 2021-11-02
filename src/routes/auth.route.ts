import { Router } from 'express'

const authRoute = Router()

authRoute.get('/', (req, res) => {
  res.sendStatus(200)
})

export default authRoute
