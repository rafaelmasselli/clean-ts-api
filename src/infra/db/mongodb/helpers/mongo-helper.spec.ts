import { MongoHelper as sut } from './mongo-helper'
require('dotenv').config()
describe('Mongo Helper', () => {
  beforeAll(async () => {
    process.env.URL_MONGODB
      ? await sut.connect(process.env.URL_MONGODB)
      : new Error('error finding mongodb url')
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
