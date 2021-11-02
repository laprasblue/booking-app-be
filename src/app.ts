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

app.listen(3000, () => console.log('Server is running 3000'))
