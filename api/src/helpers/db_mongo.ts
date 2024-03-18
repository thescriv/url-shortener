import { MongoClient } from 'mongodb'

import config from '../config'
import { logger } from '../utils/logger'

const log = logger.child({ file: 'db_mongo' })

let client: MongoClient
let dbPromise: MongoClient
let dbIsConnected = false

async function createConnection(
  dbUrl = `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`
) {
  if (dbIsConnected) {
    dbIsConnected = true

    return dbPromise
  }

  log.info(
    { func: 'createConnection' },
    'Initalize connection to MongoClient...'
  )

  client = new MongoClient(dbUrl)

  dbIsConnected = true

  log.info({ func: 'createConnection' }, 'Initalize connection to Database...')

  dbPromise = await client.connect()

  log.info({ func: 'createConnection' }, 'Connected to Database')

  return dbPromise
}

function isConnected() {
  return !!dbIsConnected
}

async function closeConnection() {
  log.info({ func: 'closeConnection' }, 'closing MONGO connection')
  if (client) {
    await client.close()

    dbIsConnected = false

    log.info({ func: 'closeConnection' }, 'MONGO Connection closed.')
  } else {
    log.info({ func: 'closeConnection' }, 'MONGO connection already closed.')
  }
}

function getDbClient() {
  return client.db()
}

export { isConnected, createConnection, closeConnection, getDbClient }
