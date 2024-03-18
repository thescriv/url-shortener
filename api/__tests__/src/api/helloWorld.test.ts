import { beforeAllSetupMongo } from '../../setup/jest.setup.beforeAll'

let client: any

describe('HelloWorld API', () => {
  beforeAll(async () => {
    client = await beforeAllSetupMongo(3000)
  })

  describe('GET /classic_get', () => {
    test('do fetch getHelloWorld', async () => {
      const { body, status } = await client.getHelloWorld()

      expect(body).toStrictEqual({})
      expect(status).toBe(204)
    })
  })

  describe('POST /classic_http', () => {
    test('do postHelloWorld', async () => {
      const { body, status } = await client.postHelloWorld({
        name: 'Koa Setup'
      })

      expect(body).toStrictEqual({ message: 'Hello World Koa Setup' })
      expect(status).toBe(200)
    })

    test('do not postHelloWorld (bad payload)', async () => {
      let error: any

      try {
        await client.postHelloWorld({
          birthday: '01/01/2000'
        })
      } catch (err: any) {
        error = err?.response
      }
      const { body, status } = error

      expect(body).toStrictEqual({
        help: "should have required property 'name'",
        message: "should have required property 'name'"
      })
      expect(status).toBe(400)
    })
  })
})
