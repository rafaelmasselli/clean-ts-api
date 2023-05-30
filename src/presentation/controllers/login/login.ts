import { MissingParamError } from '../../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    if (!HttpRequest.body.email) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email')))
      )
    }

    if (!HttpRequest.body.password) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }

    return await new Promise((resolve) => resolve)
  }
}
