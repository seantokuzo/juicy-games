import jwt from 'jsonwebtoken'
import { promisify } from 'util'
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
  if (password !== passwordConfirm) {
    throw new BadRequestError("Them passwords don't match bruh")
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
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/confirmSignup/${token}`

  // SEND TRIAL EMAIL
  await new Email(user, url).sendEmailConfirm()

  res.status(StatusCodes.CREATED).json({
    msg: "We sent you a confirmation email. If that was your real email address now's the time to prove it"
  })
}

export const confirmSignup = async (req, res) => {
  const token = req.params.token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  console.log(decoded)

  const user = await User.findById(decoded.userId).select('+confirmed')

  if (!user) {
    throw new BadRequestError('Bad token - user doesn not exist')
  }

  if (user.confirmed) {
    throw new BadRequestError('You already verified your email silly goose')
  }

  user.confirmed = true
  user.confirmationExpires = undefined
  await user.save({ validateBeforeSave: false })

  const url = `${req.protocol}://localhost:8080/game`
  await new Email(user, url).sendWelcome()

  const newToken = user.createJWT(true)
  res.status(StatusCodes.OK).json({ msg: 'Account confirmed!' })
}

export const login = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body

  // CHECK FOR ALL FIELDS
  if (!email || !password) {
    throw new BadRequestError("Email and password, c'mon now")
  }

  const user = await User.findOne({ email }).select('+password +confirmed')

  // CHECK IF USER EXISTS
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  // CHECK IF USER CONFIRMED
  if (!user.confirmed && user.confirmationExpires > Date.now()) {
    throw new BadRequestError('You gotta confirm your email first!')
  }
  // IF CONFIRMATION TOKEN EXPIRED
  if (!user.confirmed && user.confirmationExpires < Date.now()) {
    const token = user.createJWT(false)
    // CREATE URL FOR BTN IN EMAIL - TOKEN AS PARAM
    const url = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/confirmSignup/${token}`
    // SEND TRIAL EMAIL
    user.password = undefined
    user.confirmed = undefined
    await new Email(user, url).sendEmailConfirm()
    throw new BadRequestError(
      "New confirmation email sent. Don't blow it this time"
    )
  }

  const passwordTest = await user.comparePassword(password)
  if (!passwordTest) {
    throw new UnauthenticatedError('Password wrong fam')
  }

  user.password = undefined
  user.confirmed = undefined

  const token = user.createJWT(true)
  res.status(StatusCodes.OK).json({ user, token })
}

export const updateUser = async (req, res) => {
  const { username, email, emailUpdated } = req.body

  if (!username || !email) {
    throw new BadRequestError("Don't be shy, GIVE US THE INFO")
  }

  const user = await User.findOne({ _id: req.user.userId }).select('+confirmed')

  user.username = username
  user.email = email
  user.confirmed = !emailUpdated
  if (emailUpdated) {
    user.confirmationExpires = Date.now() + 24 * 60 * 60 * 1000
  }

  await user.save()

  if (emailUpdated) {
    const token = user.createJWT(false)
    const url = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/confirmSignup/${token}`
    await new Email(user, url).sendEmailConfirm()
    res.status(StatusCodes.OK).json({
      user: undefined,
      token: undefined,
      msg: 'Email updated and confirmation sent! Confirm your new email to log back in'
    })
  }
  if (!emailUpdated) {
    const token = user.createJWT(true)
    user.confirmed = undefined
    res
      .status(StatusCodes.OK)
      .json({ user, token, msg: 'Username updated. Enjoy the new digs' })
  }
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
