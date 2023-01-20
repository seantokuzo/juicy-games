// import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import BoredleWord from './models/BoredleWord.js'

import { ANSWERS_LIST } from './data/boredle/wordList.js'

const start = async () => {
  const dayMs = 1000 * 60 * 60 * 24
  const startDate = new Date(
    new Date().toLocaleDateString() + ' 0:00:00'
  ).getTime()
  const numWordsToFill = 365
  const answerListCopy = [...ANSWERS_LIST]

  const wordsList = []
  for (let i = 0; i <= numWordsToFill; i++) {
    const answerObj = {
      word: answerListCopy.splice(Math.random() * answerListCopy.length, 1)[0],
      timeBegins:
        new Date(startDate + i * dayMs).toLocaleDateString() + ' 0:00:00',
      timeExpires:
        new Date(startDate + dayMs + i * dayMs).toLocaleDateString() +
        ' 0:00:00'
    }
    wordsList.push(answerObj)
  }
  // const jsonProducts = JSON.stringify(wordsList)

  try {
    await connectDB(process.env.MONGO_URL)
    await BoredleWord.deleteMany()

    // const jsonProducts = JSON.parse(
    //   await readFile(new URL('./data/boredle/words.json', import.meta.url))
    // )

    await BoredleWord.create(wordsList)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
