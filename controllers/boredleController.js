import User from '../models/User.js'
import BoredleWord from '../models/BoredleWord.js'
import BoredleGame from '../models/BoredleGame.js'
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

  res.status(StatusCodes.OK).json({ word: word.word })
}

// *****************************************************
export const getMyBoredle = async (req, res) => {
  console.log('💥 GET MY BOREDLE')
  const game = await BoredleGame.findOne({ user: req.user.userId })
  console.log(game)

  // IF USER DOESN'T HAVE A GAME - CREATE ONE
  if (!game) {
    const word = await BoredleWord.findOne({
      timeBegins: { $lt: Date.now() },
      timeExpires: { $gt: Date.now() }
    })
    if (!word) {
      throw new NotFoundError('Oops, someone needs to add some words')
    }
    const newGame = await BoredleGame.create({
      user: req.user.userId,
      currentGame: {
        word: word._id
      }
    })
    const data = {
      currentGame: {
        word: word.word,
        prevGuesses: [],
        didWin: false,
        didLose: false
      },
      stats: newGame.stats
    }

    res.status(StatusCodes.CREATED).json(data)
    return
  }

  // CHECK IF WORD EXPIRED
  if (
    !game.currentGame.word ||
    new Date(game.currentGame.word.timeExpires).getTime() < Date.now()
  ) {
    console.log('💥 WORD EXPIRED - GET NEW WORD')
    const word = await BoredleWord.findOne({
      timeBegins: { $lt: Date.now() },
      timeExpires: { $gt: Date.now() }
    })
    if (!word) {
      throw new NotFoundError('Oops, someone needs to add some words')
    }
    game.currentGame.word = word._id
    game.currentGame.prevGuesses = []
    game.currentGame.didWin = false
    game.currentGame.didLose = false
    await game.save()

    const data = {
      currentGame: {
        word: word.word,
        prevGuesses: [],
        didWin: false,
        didLose: false
      },
      stats: game.stats
    }
    res.status(StatusCodes.OK).json(data)
    return
  }

  const data = {
    currentGame: {
      word: game.currentGame.word.word,
      prevGuesses: game.currentGame.prevGuesses,
      didWin: game.currentGame.didWin,
      didLose: game.currentGame.didLose
    },
    stats: game.stats
  }

  res.status(StatusCodes.CREATED).json(data)
}

// *****************************************************
export const submitGuess = async (req, res) => {
  console.log('💥 SUBMIT GUESS ROUTE START')
  const { guess, gameStatus } = req.body

  const game = await BoredleGame.findOne({ user: req.user.userId })

  if (!game) {
    console.log('💥 SUBMIT GUESS BUT NO GAME')
    const word = await BoredleWord.findOne({
      timeBegins: { $lt: Date.now() },
      timeExpires: { $gt: Date.now() }
    })
    const newGame = await BoredleGame.create({
      user: req.user.userId,
      currentGame: {
        word,
        prevGuesses: [guess],
        didWin: gameStatus === 'win' ? true : false
      }
    })
    console.log('🏄🏽‍♂️ New Game Created')
    res.status(StatusCodes.CREATED).json({ game: newGame })
    return
  }

  game.currentGame.prevGuesses = [...game.currentGame.prevGuesses, guess]
  if (gameStatus === 'win') {
    console.log('💥 GAME WIN')
    game.currentGame.didWin = true
    game.stats.wins = game.stats.wins + 1
    game.stats.streak = game.stats.streak + 1
    if (game.stats.streak > game.stats.maxStreak) {
      game.stats.maxStreak = game.stats.streak
    }
    const numGuesses = game.currentGame.prevGuesses.length
    if (numGuesses === 1) {
      game.stats.guessStats.one = game.stats.guessStats.one + 1
    }
    if (numGuesses === 2) {
      game.stats.guessStats.two = game.stats.guessStats.two + 1
    }
    if (numGuesses === 3) {
      game.stats.guessStats.three = game.stats.guessStats.three + 1
    }
    if (numGuesses === 4) {
      game.stats.guessStats.four = game.stats.guessStats.four + 1
    }
    if (numGuesses === 5) {
      game.stats.guessStats.five = game.stats.guessStats.five + 1
    }
    if (numGuesses === 6) {
      game.stats.guessStats.six = game.stats.guessStats.six + 1
    }
  }
  if (gameStatus === 'lose') {
    console.log('💥 GAME LOSE')
    game.currentGame.didLose = true
    game.stats.losses = game.stats.losses + 1
    game.stats.streak = 0
  }
  await game.save()

  const { didWin, didLose, prevGuesses } = game.currentGame
  let data = { didWin, didLose, prevGuesses }
  if (didWin || didLose) data.stats = game.stats

  res.status(StatusCodes.OK).json(data)
}

// *****************************************************
export const getBoredleLeaderboard = async (req, res) => {
  console.log('💥 Get Leaderboard')

  const { sort, search } = req.query

  const queryObject = {}

  if (search) {
    queryObject.word = { $regex: search, $options: 'i' }
  }

  // FIND BASED ON SEARCH
  let result = BoredleGame.find(queryObject).select(
    '-currentGame -_id -__v -stats.guessStats'
  )

  // SORTING CONDITIONS
  if (sort === 'wins') {
    result = result.sort('-stats.wins')
  }
  if (!sort || sort === 'streak') {
    result = result.sort('-stats.streak')
  }
  if (sort === 'maxStreak') {
    result = result.sort('-stats.maxStreak')
  }

  // PAGINATION
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 7
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  let leaders = await result

  leaders = leaders.map((game) => ({
    username: game.user.username,
    avatar: game.user.avatar,
    ...game.stats,
    guessStats: undefined
  }))

  const totalGames = await BoredleGame.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalGames / limit)

  res.status(StatusCodes.OK).json({ leaders, totalGames, numOfPages })
}
