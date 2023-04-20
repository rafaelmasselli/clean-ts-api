import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
import * as dotenv from 'dotenv'
dotenv.config()

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    const urlMongo = process.env.URL_MONGODB
    if (!urlMongo) return new Error()
    await MongoHelper.connect(urlMongo)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
})
