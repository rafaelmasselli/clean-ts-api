import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStup: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStup {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve) => {
        resolve('hash_password  ')
      })
    }
  }

  const encrypterStup = new EncrypterStup()
  const sut = new DbAddAccount(encrypterStup)

  return {
    sut,
    encrypterStup
  }
}
describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStup, sut } = makeSut()
    const encrypter = jest.spyOn(encrypterStup, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encrypter).toHaveBeenCalledWith('valid_password')
  })
})
