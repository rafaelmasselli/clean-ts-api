import { badRequest, serverError, ok } from '../../helpers/http-helper'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
  type AddAccount,
  Validation
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccountStub: AddAccount
  private readonly validation: Validation

  constructor (addAccountStub: AddAccount, validation: Validation) {
    this.addAccountStub = addAccountStub
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
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
