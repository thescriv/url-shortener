import { ErrorParameters } from 'ajv'
import { DefaultContext } from 'koa'

export interface HashOf<T> {
  [key: T]: any
}

export interface Error {
  message: string

  param?: ErrorParameters
  keyword?: string
  details?: string
  help?: string
  status?: number
}

export interface ContextApp extends DefaultContext {} // eslint-disable-line
