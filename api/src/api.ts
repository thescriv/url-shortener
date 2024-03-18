import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { Server } from 'http'

import { logger } from './utils/logger'
import { createConnection, closeConnection } from './helpers/db_mongo'

import handleSuccess from './middleware/handleSuccess'
import handleErrorMiddleware from './middleware/handleError'

import helloWorldRouter from './api/helloWorld/helloWorld.index'

import config from './config'

const log = logger.child({ func: 'api' })

let server: Server

async function startApi(port?: number) {
  const app: Koa = new Koa()

  await createConnection()

  app.use(bodyParser())
  app.use(cors())

  app.use(handleSuccess)
  app.use(handleErrorMiddleware)

  app.use(helloWorldRouter)

  server = app.listen(port || config.API_PORT)

  log.info({ func: 'startApi' }, `Listening on port ${port || config.API_PORT}`)

  server.on('error', log.error)

  return server
}

async function stopApi() {
  await Promise.all([
    new Promise<void>((resolve) => {
      log.info({ func: 'stopApi' }, 'Closing server...')

      if (server) {
        server.close()

        log.info({ func: 'stopApi' }, 'Server closed.')
      } else {
        log.info({ func: 'stopApi' }, 'Server already closed.')
      }
      resolve()
    }),
    await closeConnection()
  ])
}

process.on('SIGTERM', async () => {
  log.info({ func: 'stopApi' }, 'get a SIGTERM signal')
  await stopApi()
})
process.on('SIGINT', async () => {
  log.info({ func: 'stopApi' }, 'get a SIGINT signal')
  await stopApi()
})

export { startApi, stopApi }
