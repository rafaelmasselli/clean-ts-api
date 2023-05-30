import { MissingParamError } from './../../../errors/missing-param-error'
import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'

interface SutTypes {
  sut: LoginController
}

const makeSut = (): any => {
  const sut = new LoginController()
  return {
    sut
  }
}
describe('Login controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('Should returns 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
