import { Collection, Db, MongoClient } from 'mongodb'
import { AccountModelMongoDB } from '../interface/user-mongodb'

export class MongoHelper {
  static client: MongoClient
  static uri: string
  static cachedDb: Db

  static async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  }

  static async disconnect (): Promise<void> {
    await this.client.close()
  }

  static async getCollection (name: string): Promise<Collection> {
    if (this.cachedDb) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }

  static map (collection: any): any {
    const { _id, ...accountWithoutId } =
      collection as unknown as AccountModelMongoDB
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
