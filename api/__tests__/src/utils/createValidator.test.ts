import { createValidator } from '../../../src/utils/createValidator'

describe('Create validator', () => {
  test('do create a validator function', () => {
    const validatorFunction = createValidator({
      type: 'string'
    })

    expect(validatorFunction).toBeDefined()
  })

  test('do create a validator function and pass the validation', () => {
    const validatorFunction = createValidator({
      type: 'string'
    })

    expect(validatorFunction).toBeDefined()

    const validationReturn = validatorFunction('foobar')
    expect(validationReturn.errors).toStrictEqual([])
    expect(validationReturn.isValid).toBe(true)
  })

  test('do create a validator function and fail the validation', () => {
    const validatorFunction = createValidator({
      type: 'string'
    })

    expect(validatorFunction).toBeDefined()

    const validationReturn = validatorFunction(123)
    expect(validationReturn.errors).toStrictEqual([
      {
        details: { type: 'string' },
        keyword: 'type',
        message: 'should be string',
        param: ''
      }
    ])
    expect(validationReturn.isValid).toBe(false)
  })
})
