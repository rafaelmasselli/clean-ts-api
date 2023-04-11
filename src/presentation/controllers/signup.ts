import { type HttpRequest, type HttpResponse } from '../protocols/https'
import { type Controller } from '../protocols/controller'
import { type EmailValidator } from '../protocols/email-validator'

import { badRequest, serverError } from '../helpers/http-helper'

import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      return {
        statusCode: 200,
        body: 'success'
      }
    } catch (err) {
      console.error('erro', err)
      return serverError()
    }
  }
}
