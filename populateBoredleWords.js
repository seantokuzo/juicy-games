import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import BoredleWord from './models/BoredleWord.js'

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await BoredleWord.deleteMany()

    const jsonProducts = JSON.parse(
      await readFile(new URL('./data/boredle/words.json', import.meta.url))
    )
    await BoredleWord.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
