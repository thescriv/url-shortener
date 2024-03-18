import { ContextApp, Error } from '../../../src/interface'
import handleErrorMiddleware from '../../../src/middleware/handleError'

describe('Middleware handleError', () => {
  test('no error to handle', async () => {
    const nextMock = jest.fn().mockImplementation(() => {})

    const ctx: any = {}

    handleErrorMiddleware(ctx, nextMock)

    expect(ctx).toStrictEqual({})
  })

  test('do handle basic error', async () => {
    const nextMock = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    const ctx: any = {}

    handleErrorMiddleware(ctx as ContextApp, nextMock)

    expect(ctx).not.toStrictEqual({})
    expect(ctx.status).toBe(500)
    expect(ctx.body).toStrictEqual({
      message: 'errors.default',
      help: 'errors.default'
    })
  })

  test('do handle http error', async () => {
    const nextMock = jest.fn().mockImplementation(() => {
      const error: any = new Error('RANDOM ERROR')
      error.status = 400
      throw error
    })

    const ctx: any = {}

    handleErrorMiddleware(ctx, nextMock)

    expect(ctx).not.toStrictEqual({})
    expect(ctx.status).toBe(400)
    expect(ctx.body).toStrictEqual({
      message: 'RANDOM ERROR',
      help: 'RANDOM ERROR'
    })
  })

  test('do handle http error with an help error', async () => {
    const nextMock = jest.fn().mockImplementation(() => {
      const error: any = new Error('RANDOM ERROR')
      error.status = 400
      error.help = 'please try again !'
      throw error
    })

    const ctx: any = {}

    handleErrorMiddleware(ctx, nextMock)

    expect(ctx).not.toStrictEqual({})
    expect(ctx.status).toBe(400)
    expect(ctx.body).toStrictEqual({
      message: 'RANDOM ERROR',
      help: 'please try again !'
    })
  })
})
