import { ServerError, UnauthorizedError } from '../../errors'
import { type HttpResponse } from '../protocols/https'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack ? error.stack : 'Internal Server error')
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
