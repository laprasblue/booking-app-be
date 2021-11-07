import { Router } from 'express'
import { login } from '../controllers/auth.controller'

const authRoute = Router()

authRoute.post('/login', login)

export default authRoute
