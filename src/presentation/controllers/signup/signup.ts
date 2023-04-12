import { InvalidParamError, MissingParamError } from '../../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
  type AddAccount,
  type EmailValidator
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccountStub: AddAccount

  constructor (emailValidator: EmailValidator, addAccountStub: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccountStub = addAccountStub
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
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
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      this.addAccountStub.add({
        name,
        email,
        password
      })

      return {
        statusCode: 200,
        body: 'success'
      }
    } catch (err) {
      return serverError()
    }
  }
}
