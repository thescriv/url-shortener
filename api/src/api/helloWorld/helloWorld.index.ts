import Router from '@koa/router'

import {
  getHelloWorldController,
  postHelloWorldController
} from './helloWorld.controller'

const router = new Router()

router.get('/hello_world/classic_get', getHelloWorldController)

router.post('/hello_world/classic_post', postHelloWorldController)

export default router.routes()
