import Ajv from 'ajv'

import { HashOf } from '../interface'

const ajv = new Ajv()

function createValidator(schema: HashOf<any>) {
  const ajvValidator = ajv.compile(schema)

  return function validate(data: any) {
    const isValid = ajvValidator(data)

    let errors: Error[] = []

    if (!isValid) {
      const ajvErrors = ajvValidator.errors as Ajv.ErrorObject[]
      errors = ajvErrors.map((error) => {
        const dataPath = error.dataPath.replace(/\./, '')

        const message = `${dataPath}${error.message}`

        return {
          param: dataPath,
          keyword: error.keyword,
          message,
          details: error.params
        }
      }) as any
    }

    return { isValid, errors }
  }
}

export { createValidator }
