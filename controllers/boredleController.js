import User from '../models/User.js'
import BoredleWord from '../models/BoredleWord.js'
import { StatusCodes } from 'http-status-codes'

import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  ServerError
} from '../errors/index.js'

// *****************************************************
export const getAllWords = async (req, res) => {
  // const user = await User.findById(req.user.userId)
  // if (user.role !== 'admin' || user.role !== 'quiz-master') {
  //   throw new UnauthenticatedError('Who do you think you are, peasant?')
  // }

  const { sort, search } = req.query

  const queryObject = {}

  if (search) {
    queryObject.word = { $regex: search, $options: 'i' }
  }

  // FIND BASED ON SEARCH
  let result = BoredleWord.find(queryObject)

  // SORTING CONDITIONS
  if (!sort || sort === 'oldest') {
    result = result.sort('timeBegins')
  }
  if (sort === 'newest') {
    result = result.sort('-timeBegins')
  }
  if (sort === 'a-z') {
    result = result.sort('word')
  }
  if (sort === 'z-a') {
    result = result.sort('-word')
  }

  // PAGINATION
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const words = await result

  const totalWords = await BoredleWord.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalWords / limit)

  res.status(StatusCodes.OK).json({ words, totalWords, numOfPages })
}

// *****************************************************
export const getWordOfTheDay = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) {
    throw new UnauthenticatedError('Get outta here!')
  }

  const word = await BoredleWord.findOne({
    timeBegins: { $lt: Date.now() },
    timeExpires: { $gt: Date.now() }
  })
  if (!word) {
    throw new NotFoundError("Didn't find today's word, OOPS")
  }
  console.log(word)

  res.status(StatusCodes.OK).json(word)
}
