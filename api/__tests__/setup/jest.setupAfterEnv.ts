import { restoreDate, mockDate } from '../jest.mock'
import { stopApi } from '../../src/api'
import {
  closeConnection as closeMongoConnection,
  getDbClient,
  isConnected
} from '../../src/helpers/db_mongo'

import { closeConnection as closeMysqlConnection } from '../../src/helpers/db_mysql'

beforeEach(() => {
  restoreDate()

  mockDate()
})

afterEach(() => {
  jest.restoreAllMocks()
})

afterAll(async () => {
  if (isConnected()) {
    await getDbClient().dropDatabase()
  }

  await closeMongoConnection()
  await closeMysqlConnection()

  await stopApi()
})
