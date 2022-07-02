const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const appRouter = require('./routes/appRoutes')

const app = express()

// 1) GLOBAL MIDDLEWARES

// Set Security HTTP Headers
app.use(helmet())

// Dev Logging
if (process.env.NODE_END === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, slow down bot'
})
app.use('/api', limiter)

// Body Parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data Sanitization against XSS
app.use(xss())

// Serving static files
// app.use(express.static(`${__dirname}/public`))

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.headers)
  next()
})

// 3) ROUTES
app.use('/api/v1/trivial-trivia', appRouter)

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
// })

// app.use(globalErrorHandler)

module.exports = app
