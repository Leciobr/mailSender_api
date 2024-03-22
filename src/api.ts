const PORT = process.env.PORT || 4000

/* eslint-disable import/first */
require('dotenv').config()

import 'reflect-metadata'

import cors from 'cors';
import express, { json } from 'express'
import helmet from 'helmet'
import { logger } from './utils'

import { errorMiddleware, requestLogMiddleware } from './middlewares'
import generalRouter from './modules/general/routes'
import authenticationRouter from './modules/authentication/routes'
import scheduleEmails from './modules/schedule-emails/routes'

const api = express()
const bodyParser = require('body-parser')

api.use(cors());
api.use(json({ limit: '50mb' }))
api.use(helmet())
api.use(bodyParser.urlencoded({ extended: true }))

/** Request Log */
api.use(requestLogMiddleware) // detailed log
api.use((req, res, next) => {
  // basic request log
  logger.info(`${req.method} ${req.url} - ${res.statusCode}`)
  next()
})

const router = express.Router()

router.use('/', generalRouter)
router.use('/schedule-emails', scheduleEmails)
router.use('/auth', authenticationRouter)

// Mount the v1 router with the /v1 prefix
api.use('/', router)
api.use('/v1', router)

api.use((_, res, _2) => res.status(404).json({ error: 'NOT FOUND' }))

/**
 * Middleware Error
 */
api.use(errorMiddleware)

const server = api.listen(PORT, async () => {
  logger.info(`Listening on port ${PORT}`)
})

const gracefulShutdown = () => {
  logger.warn('Received shutdown signal, closing server...')

  server.close((err: any) => {
    if (err) {
      logger.error('Error occurred while closing the server:', err)
      process.exit(1)
    }

    logger.info('Server closed, exiting process...')
    process.exit(0)
  })
}
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
