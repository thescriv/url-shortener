import Router from '@koa/router'

import {
    postShortenUrlController,
    postRedirectShortedUrlController
} from './shorten.controller'

const router = new Router()

router.post('/shorten/url', postShortenUrlController)

router.get(/^\/su[\w\d]{6}$/, postRedirectShortedUrlController)

export default router.routes()
