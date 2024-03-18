import pino from 'pino'

import config from '../config'

const pinoOption: {
  sync: boolean
  level: string
  transport?: { target: 'pino-pretty' }
} = {
  sync: true,
  level: config.LOGGER_LEVEL
}

/* istanbul ignore if */
if (['local'].includes(config.NODE_ENV)) {
  pinoOption.transport = { target: 'pino-pretty' }
}

const logger = pino(pinoOption)

export { logger }
