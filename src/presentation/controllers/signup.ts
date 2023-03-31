import { type HttpRequest, type HttpResponse } from '../protocols/https'
import { MissingParamError } from '../../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const body = httpRequest.body
    if (!body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    return {
      statusCode: 400,
      body: new MissingParamError('name')
    }
  }
}
