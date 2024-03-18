import * as superagent from 'superagent'

import { HashOf } from '../src/interface'

export default class ApiClient {
  apiUrl: string

  constructor(port: string) {
    this.apiUrl = `localhost:${port}`
  }

  async getHelloWorld() {
    return await superagent.get(`${this.apiUrl}/hello_world/classic_get`)
  }

  async postHelloWorld(payload: HashOf<any>) {
    return await superagent
      .post(`${this.apiUrl}/hello_world/classic_post`)
      .send(payload)
  }
}
