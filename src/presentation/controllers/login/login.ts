import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../../errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http-helper'

export class LoginController {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.authentication = authentication
    this.emailValidator = emailValidator
  }

  async handle (HttpRequest: HttpRequest): Promise<any> {
    try {
      const { email, password } = HttpRequest.body
      if (!email) {
        return badRequest(new MissingParamError('email'))
      }

      if (!password) {
        return badRequest(new MissingParamError('password'))
      }
      const isValid = this.emailValidator.isValid(HttpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken: 'any_token' })
    } catch (error) {
      return serverError(error)
    }
  }
}
