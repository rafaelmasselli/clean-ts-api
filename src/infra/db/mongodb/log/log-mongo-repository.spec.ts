import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log-mongo-repository'
require('dotenv').config()

const makeSUt = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let erroCollection: Collection
  beforeAll(async () => {
    process.env.URL_MONGODB
      ? await MongoHelper.connect(process.env.URL_MONGODB)
      : new Error('error finding mongodb url')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    erroCollection = await MongoHelper.getCollection('errors')
    await erroCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSUt()
    await sut.logError('any_erro')
    const count = await erroCollection.countDocuments()
    expect(count).toBe(1)
  })
})
