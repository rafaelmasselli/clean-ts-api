import { DbAddAccount } from './db-add-account'

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStup {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => { resolve('hash_password  ') })
      }
    }

    const encrypterStup = new EncrypterStup()
    const sut = new DbAddAccount(encrypterStup)
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
