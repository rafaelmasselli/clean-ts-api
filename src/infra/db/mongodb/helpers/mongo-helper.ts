import { MongoClient, type ConnectOptions } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connection (url: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
