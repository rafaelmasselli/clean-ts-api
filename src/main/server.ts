
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import { app } from './config/app'
import * as dotenv from 'dotenv'
dotenv.config()

process.env.URL_MONGODB
  ? MongoHelper.connect(process.env.URL_MONGODB)
    .then(async () => {
      app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
    })
    .catch(console.error)
  : new Error('error finding mongodb url')
