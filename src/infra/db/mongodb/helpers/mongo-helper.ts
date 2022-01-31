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
    console.log('typeof (this.db)', typeof (this.db))
    if ((typeof (this?.db) === 'object') ? (this.db !== null) : false) {
      return this.db.collection(name)
    }
    await this.connect(this.uri)
    return this.db.collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
