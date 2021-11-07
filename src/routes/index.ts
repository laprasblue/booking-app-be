import { Request, Response, Router } from 'express'
import { authenticateToken } from '../middlewares/authentication/authenticateToken'
import authRoute from './auth.route'
import userRoute from './user.route'

const router = Router()

router.use('/auth', authRoute).use('/user', userRoute)
router.post('/test', authenticateToken, (req: Request, res: Response) => {
  console.log(res.locals.username)
  res.sendStatus(200)
})

export default router
