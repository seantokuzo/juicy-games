import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import 'express-async-errors'
import morgan from 'morgan'

// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
// import path from 'path'

// SECURITY PACKAGES
// import helmet from 'helmet'
// import xss from 'xss-clean'
// import mongoSanitize from 'express-mongo-sanitize'

// DB AND AUTHENTICATE USER
import connectDB from './db/connect.js'

// ROUTERS
import authRouter from './routes/authRoutes.js'
// import jobsRouter from './routes/jobsRoutes.js'

// MIDDLEWARE
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// const __dirname = dirname(fileURLToPath(import.meta.url))

// app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(cors())
app.use(express.json())

// SECURITY PACKAGES
// app.use(helmet())
// app.use(xss())
// app.use(mongoSanitize())

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' })
})

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API Version 1' })
})

app.use('/api/v1/auth', authRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build/index.html'))
// })

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
