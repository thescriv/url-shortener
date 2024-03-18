import { ContextApp } from '../interface'

import { isEmpty } from 'lodash'

export default async function handleSuccess(ctx: ContextApp, next: () => void) {
  await next()

  if (ctx.status === 200 && isEmpty(ctx.body)) {
    ctx.status = 204
  }
}
