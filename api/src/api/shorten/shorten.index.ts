import Router from '@koa/router'

import {
    postShortenUrlController
} from './shorten.controller'

const router = new Router()

router.post('/shorten/url', postShortenUrlController)

export default router.routes()
