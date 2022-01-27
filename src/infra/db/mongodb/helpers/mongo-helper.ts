import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  db: null as any,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.db = await this.client.db()
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
    this.db = null
  },

  async getCollection (name: string): Promise<Collection> {
    if ((typeof (this.client) === 'undefined' || false) ? true : !this.db) {
      await this.connect(this.uri)
    }
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
