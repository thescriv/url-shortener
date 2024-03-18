import { createValidator } from '../../utils/createValidator'

const validateShortenerUrldBody = createValidator({
  type: 'object',
  properties: {
    url: { type: 'string' }
  },
  required: ['url']
})

export { validateShortenerUrldBody }
