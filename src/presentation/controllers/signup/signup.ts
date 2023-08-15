import { InvalidParamError, MissingParamError } from '../../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
  type EmailValidator,
  type AddAccount,
  Validation
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccountStub: AddAccount
  private readonly validation: Validation

  constructor (
    emailValidator: EmailValidator,
    addAccountStub: AddAccount,
    validation: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccountStub = addAccountStub
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      await this.validation.validate(httpRequest.body)
      const { name, email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      const account = await this.addAccountStub.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
