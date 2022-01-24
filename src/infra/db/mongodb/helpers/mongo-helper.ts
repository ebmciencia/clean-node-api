import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  db: null as any,

  async connect (): Promise<void> {
    this.client = await MongoClient.connect(global.__MONGO_URI__)
    this.db = await this.client.db()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.db.collection(name)
  }
}
