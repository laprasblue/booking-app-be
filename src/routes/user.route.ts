import { Router } from 'express'
import { changePasswordUser, createUser } from '../controllers/user.controller'
import { changePasswordValidator, createUserValidator } from '../middlewares/validators/user.validator'

const userRoute = Router()

userRoute.post('/create', createUserValidator, createUser)
userRoute.put('/password', changePasswordValidator, changePasswordUser)

export default userRoute
