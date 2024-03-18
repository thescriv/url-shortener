import mysql, { Pool } from 'mysql2/promise'

import config from '../config'
import { logger } from '../utils/logger'

const log = logger.child({ file: 'db_mongo' })

let pool: mysql.Pool
let dbPromise: Pool
let dbIsConnected = false

/* MYSQL FILE */

async function createConnection(databaseName = config.MYSQL_DATABASE_NAME) {
  if (dbIsConnected) {
    dbIsConnected = true

    return dbPromise
  }

  log.info(
    { func: 'createConnection' },
    'Initalize connection to MysqlClient...'
  )

  const mysqlFirstConnection = await mysql.createConnection({
    host: config.MYSQL_URL,
    user: config.MYSQL_USER
  })

  mysqlFirstConnection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`)

  log.info({ func: 'createConnection' }, 'Initalize connection to Database...')

  pool = mysql.createPool({
    host: config.MYSQL_URL,
    user: config.MYSQL_USER,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    database: databaseName
  })

  await mysqlFirstConnection.end()

  dbIsConnected = true

  log.info({ func: 'createConnection' }, 'Connected to Database')

  dbPromise = pool

  return pool
}

function isConnected() {
  return !!dbIsConnected
}

async function closeConnection() {
  log.info({ func: 'closeConnection' }, 'closing MYSQL connection')
  if (dbIsConnected) {
    await pool.end()

    dbIsConnected = false

    log.info({ func: 'closeConnection' }, 'MYSQL Connection closed.')
  } else {
    log.info({ func: 'closeConnection' }, 'MYSQL connection already closed.')
  }
}

export { createConnection, closeConnection, isConnected }
