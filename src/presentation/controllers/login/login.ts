import { EmailValidator } from './../../protocols/email-validator'
import { InvalidParamError, MissingParamError } from '../../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { Authentication } from '../../../domain/usecases/authentication'

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
    } catch (error) {
      return serverError(error)
    }
  }
}
