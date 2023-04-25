import request from 'supertest'
import { app } from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
require('dotenv').config()

describe('SignUp Routes', () => {
  beforeAll(async () => {
    process.env.URL_MONGODB
      ? await MongoHelper.connect(process.env.URL_MONGODB)
      : new Error('error finding mongodb url')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
