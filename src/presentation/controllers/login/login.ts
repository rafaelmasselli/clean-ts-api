import { EmailValidator } from './../../protocols/email-validator'
import { InvalidParamError, MissingParamError } from '../../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (HttpRequest: HttpRequest): Promise<any> {
    try {
      const { email, password } = HttpRequest.body
      if (!email) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('email')))
        )
      }

      if (!password) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('password')))
        )
      }
      const isValid = this.emailValidator.isValid(HttpRequest.body.email)

      if (!isValid) {
        return await new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError('email')))
        )
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
