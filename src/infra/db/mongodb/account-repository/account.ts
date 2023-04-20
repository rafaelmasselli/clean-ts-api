import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

interface AccountModelMongoDB {
  _id: string
  name: string
  password: string
  email: string
}

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountConnection = MongoHelper.getCollection('accounts')
    const resultIdNewAccount = await accountConnection.insertOne(accountData)
    const account = await accountConnection.findOne(resultIdNewAccount.insertedId) as unknown as AccountModel
    const { _id, ...accountWithoutId } = account as unknown as AccountModelMongoDB
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
