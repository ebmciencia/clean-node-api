import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const insertedAccount = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: insertedAccount.insertedId })
    let accountWithoutId = account as Object
    accountWithoutId = Object.keys(accountWithoutId).reduce((accumulator, key) => {
      if (key !== '_id') {
        accumulator[key] = accountWithoutId[key]
      }
      return accumulator
    }, {})
    const adjustedAccount = Object.assign({}, accountWithoutId, { id: insertedAccount.insertedId })
    return adjustedAccount as unknown as AccountModel
  }
}
