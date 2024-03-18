import { createValidator } from '../../utils/createValidator'

const validateHelloWorldBody = createValidator({
  type: 'object',
  properties: {
    name: { type: 'string' }
  },
  required: ['name']
})

export { validateHelloWorldBody }
