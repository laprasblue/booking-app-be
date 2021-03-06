import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import retryConnectDB from './utils/retryConnectDB'
import router from './routes'
retryConnectDB(5)

const app: Application = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/', router)

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.log('Please set env variables!!!')
  process.exit(1)
}

app.listen(3000, () => console.log('Server is running 3000'))
