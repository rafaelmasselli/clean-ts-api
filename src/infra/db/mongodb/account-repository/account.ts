import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountConnection = MongoHelper.getCollection('accounts')
    await accountConnection.insertOne(accountData)
    const account = {
      id: 'any_valid',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }

    return account
  }
}
