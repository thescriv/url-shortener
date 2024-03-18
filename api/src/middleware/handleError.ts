import { logger } from '../utils/logger'

import translate from '../utils/i18n'
import { ContextApp } from '../interface'

const log = logger.child({ func: 'handleErrorMiddleware' })

export default async function handleErrorMiddleware(
  ctx: ContextApp,
  next: () => Promise<void>
) {
  try {
    await next()
  } catch (err: any) {
    ctx.status = err.status || 500

    const errorMessage = translate(err?.message || 'errors.default', {
      lng: ctx?.language || 'en'
    })

    const error = {
      message: errorMessage,
      help: err?.help || errorMessage
    }

    log.error({ err })

    ctx.body = error
  }
}
