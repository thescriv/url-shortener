import dotenv from 'dotenv'

import { startApi } from './src/api'

async function main() {
  try {
    dotenv.config()

    await startApi()
  } catch (err) {
    console.error({ err })
  }
}

main()
