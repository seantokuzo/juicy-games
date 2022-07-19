import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  // CHECK FOR ALL FIELDS
  if (!username || !email || !password) {
    throw new BadRequestError('Quit skimping on the info. Fill out all fields!')
  }

  // CHECK FOR EXISTING USER WITH USERNAME OR EMAIL
  const prevUsername = await User.findOne({ username })
  console.log(prevUsername)
  if (prevUsername) {
    throw new BadRequestError('Username taken. Way to be original')
  }
  const prevEmail = await User.findOne({ email })
  if (prevEmail) {
    throw new BadRequestError('A user with this email already exists')
  }

  const user = await User.create({ username, email, password })
  const token = 'Ay babay'

  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      email: user.email
    },
    token
  })
}

export const login = async (req, res) => {
  console.log(req.body)
}

export const updateMe = async (req, res) => {
  console.log(req.body)
}

export const updatePassword = async (req, res) => {
  console.log(req.body)
}
