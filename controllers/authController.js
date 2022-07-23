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
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user,
    token
  })
}

export const login = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body

  // CHECK FOR ALL FIELDS
  if (!email || !password) {
    throw new BadRequestError("Email and password, c'mon now")
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const passwordTest = await user.comparePassword(password)
  if (!passwordTest) {
    throw new UnauthenticatedError('Password wrong fam')
  }

  user.password = undefined

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
}

export const updateUser = async (req, res) => {
  const { username, email } = req.body

  if (!username || !email) {
    throw new BadRequestError("Don't be shy, GIVE US THE INFO")
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.username = username
  user.email = email

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token })
}

export const updatePassword = async (req, res) => {
  console.log(req.body)
}
