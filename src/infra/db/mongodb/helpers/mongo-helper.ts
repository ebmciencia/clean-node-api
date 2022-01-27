import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  db: null as any,

  async connect (uri): Promise<void> {
    this.client = await MongoClient.connect(uri)
    this.db = await this.client.db()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.db.collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
/*   let accountWithoutId = account as Object
  accountWithoutId = Object.keys(accountWithoutId).reduce((accumulator, key) => {
    if (key !== '_id') {
      accumulator[key] = accountWithoutId[key]
    }
    return accumulator
  }, {})
  const adjustedAccount = Object.assign({}, accountWithoutId, { id: account._id })
  return adjustedAccount as unknown as AccountModel */
}
