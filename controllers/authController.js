import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import { Email } from '../utils/email.js'

export const signup = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body

  // CHECK FOR ALL FIELDS
  if (!username || !email || !password || !passwordConfirm) {
    throw new BadRequestError('Quit skimping on the info. Fill out all fields!')
  }

  // CHECK IF PASSWORDS MATCH
  if (!username || !email || !password || !passwordConfirm) {
    throw new BadRequestError('Quit skimping on the info. Fill out all fields!')
  }

  // CHECK FOR EXISTING USER WITH USERNAME
  let prevUser = await User.findOne({ username }).select('+confirmed')
  // IF PREVIOUS USER EXISTS AND CONFIRMED
  if (prevUser && prevUser.confirmed) {
    throw new BadRequestError('Username taken. Way to be original')
  }
  // IF NO PREVIOUS USER WITH USERNAME - CHECK FOR PREV USER WITH EMAIL
  if (!prevUser) {
    prevUser = await User.findOne({ email }).select('+confirmed')
  }
  if (prevUser && prevUser.confirmed) {
    throw new BadRequestError('Email taken. Way to be original')
  }
  // IF PREVIOUS USER EXISTS BUT IS NOT CONFIRMED AND TOKEN STILL VALID
  if (
    prevUser &&
    !prevUser.confirmed &&
    prevUser.confirmationExpires > Date.now()
  ) {
    throw new BadRequestError(
      'Confirmation email has already been sent. Please check your email'
    )
  }
  // IF PREVIOUS USER EXISTS BUT CONFIRMATION TOKEN EXPIRED
  if (
    prevUser &&
    !prevUser.confirmed &&
    prevUser.confirmationExpires < Date.now()
  ) {
    await User.deleteOne({ username })
  }

  const dateJoined = Date.now()
  const confirmationExpires = Date.now() + 24 * 60 * 60 * 1000

  const user = await User.create({
    username,
    email,
    password,
    dateJoined,
    confirmationExpires
  })
  const token = user.createJWT(false)

  // CREATE URL FOR BTN IN EMAIL - TOKEN AS PARAM
  // FOR DEVELOPMENT
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/confirmSignup/${token}`
  // FOR PRODUCTION
  // const url = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/auth/confirmSignup/${token}`

  // SEND TRIAL EMAIL
  await new Email(user, url).sendEmailConfirm()

  res.status(StatusCodes.CREATED).json({
    msg: "We sent you an email. If that was your real email address now's the time to prove it"
  })
}

export const confirmSignup = async (req, res) => {
  console.log('confirm me please')
  res.status(StatusCodes.OK).json({msg: 'oh fuhhh ya'})
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

  const token = user.createJWT(true)
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

  const token = user.createJWT(true)

  res.status(StatusCodes.OK).json({ user, token })
}

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  // GET USER
  const user = await User.findOne({ _id: req.user.userId }).select('+password')
  // IF NO USER
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // CHECK IF PASSWORD IS CORRECT
  const isPasswordCorrect = await user.comparePassword(currentPassword)
  if (!isPasswordCorrect) {
    throw new BadRequestError('You fudged up your current password! Try again')
  }
  // IF PASSWORD IS CORRECT UPDATE PASSWORD
  user.password = newPassword
  await user.save()

  const token = user.createJWT(true)

  res.status(StatusCodes.OK).json({ token })
}

export const forgotPassword = async (req, res) => {
  console.log('forgot password')
}

export const resetPassword = async (req, res) => {
  console.log('reset password')
}
