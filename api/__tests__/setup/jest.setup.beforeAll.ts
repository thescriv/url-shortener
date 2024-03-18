import config from '../../src/config'
import { createConnection } from '../../src/helpers/db_mongo'

import { startApi } from '../../src/api'

import ApiClient from '../apiClient'

async function beforeAllSetupMongo(port: any) {
  await createConnection(
    `${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}-${config.JEST_WORKER_ID}`
  )

  await startApi(port)

  const client = new ApiClient(port)

  return client
}

async function beforeAllSetupMysql(port: any) {
  await createConnection()

  await startApi(port)

  const client = new ApiClient(port)

  return client
}

export { beforeAllSetupMongo, beforeAllSetupMysql }
