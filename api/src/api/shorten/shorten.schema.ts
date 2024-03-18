import { createValidator } from '../../utils/createValidator'

const validateShortenerUrldBody = createValidator({
  type: 'object',
  properties: {
    url: { type: 'string', pattern: 'https:\/\/.+' }
  },
  required: ['url']
})

export { validateShortenerUrldBody }
