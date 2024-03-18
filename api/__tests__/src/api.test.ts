import { startApi, stopApi } from '../../src/api'
import config from '../../src/config'

describe('Global test api', () => {
  test('do launch and close api', async () => {
    const server = await startApi(3002)

    expect(server).toBeDefined()

    await stopApi()
  })

  test('do launch and close api (no port sent)', async () => {
    config.API_PORT = 3002
    const server = await startApi()

    expect(server).toBeDefined()

    await stopApi()

    config.API_PORT = 3000
  })

  test('do launch receive a SIGTERM signal and close api', async () => {
    const server = await startApi(3002)

    expect(server).toBeDefined()

    process.emit('SIGTERM', 'SIGTERM')
  })

  test('do launch receive a SIGINT signal and close api', async () => {
    const server = await startApi(3002)

    expect(server).toBeDefined()

    process.emit('SIGINT', 'SIGINT')
  })
})
