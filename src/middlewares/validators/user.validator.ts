import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

export const createUserValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password, email } = req.body
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('No username provided.')
      .min(8, 'Username is too short - should be 8 chars minimum.')
      .max(20, 'Username is too long - should be 20 chars maximum.')
      .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, 'Username is invalid'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
        'Password has at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character.'
      ),
    email: yup.string().required('No email provided.').email()
  })
  schema
    .validate({
      username,
      password,
      email
    })
    .then(() => next())
    .catch(error => {
      res.status(400).json({
        message: error.errors[0]
      })
      return
    })
}

export const changePasswordValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password, oldPassword } = req.body
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('No username provided.')
      .min(8, 'Username is too short - should be 8 chars minimum.')
      .max(20, 'Username is too long - should be 20 chars maximum.')
      .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, 'Username is invalid'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
        'Password has at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character.'
      ),
    oldPassword: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
        'Password has at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character.'
      )
  })
  schema
    .validate({
      username,
      password,
      oldPassword
    })
    .then(() => next())
    .catch(error => {
      res.status(400).json({
        message: error.errors[0]
      })
      return
    })
}
