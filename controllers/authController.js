import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  ServerError
} from '../errors/index.js'
import { Email } from '../utils/email.js'

// ********** SIGNUP * SIGNUP * SIGNUP **********
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
  // QUICK EXPIRE FOR DEV
  // const confirmationExpires = Date.now() + 1000

  const user = await User.create({
    username,
    email,
    password,
    dateJoined,
    confirmationExpires
  })

  // CREATE URL FOR BTN IN EMAIL - TOKEN AS PARAM
  const token = user.createJWT(false)
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/confirmEmail/${token}`

  // SEND TRIAL EMAIL
  await new Email(user, url).sendEmailConfirm()

  res.status(StatusCodes.CREATED).json({
    msg: "We sent you a confirmation email. If that was your real email address now's the time to prove it"
  })
}

// ********** CONFIRM EMAIL * CONFIRM EMAIL * CONFIRM EMAIL **********
export const confirmEmail = async (req, res) => {
  const token = req.params.token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.userId).select('+confirmed')

  if (!user) {
    throw new BadRequestError('Bad token - user doesn not exist')
  }

  if (Date.now() > user.confirmationExpires) {
    throw new BadRequestError(
      'Your confirmation link has expired. Try signing up again'
    )
  }

  if (user.confirmed) {
    throw new BadRequestError('You already verified this email silly goose')
  }

  if (user.newEmail) {
    user.email = user.newEmail
    user.newEmail = undefined
  }

  user.confirmed = true
  user.confirmationExpires = undefined
  await user.save({ validateBeforeSave: false })

  // WELCOME EMAIL
  // const url = `${req.protocol}://localhost:8080/me`
  // await new Email(user, url).sendWelcome()

  // res.status(StatusCodes.OK).json({ msg: 'Account confirmed!' })

  const __dirname = dirname(fileURLToPath(import.meta.url))

  res
    .status(StatusCodes.OK)
    .sendFile(path.resolve(__dirname, '../html/emailConfirmed.html'))

  // (__dirname, './client/build/index.html')
}

// ********** LOGIN * LOGIN * LOGIN **********
export const login = async (req, res) => {
  console.log(req.body)
  const { email, username, password } = req.body

  // CHECK FOR ALL FIELDS - MUST HAVE EITHER EMAIL OR USERNAME
  if ((!email && !username) || !password) {
    throw new BadRequestError("Email and password, c'mon now")
  }
  let user
  // IF REQ HAS EMAIL FIND USER BY EMAIL
  if (email) {
    user = await User.findOne({ email }).select('+password +confirmed')
  }
  // IF REQ HAS USERNAME FIND USER BY USERNAME
  if (!user && username) {
    user = await User.findOne({ username }).select('+password +confirmed')
  }
  // IF USER IS FOUND AND HAS NEW EMAIL FIELD - TELL THEM TO CONFIRM THEIR UPDATED EMAIL
  // if (user) {
  //   if (user.newEmail) {
  //     throw new UnauthenticatedError(
  //       'Confirm your updated email before logging back in'
  //     )
  //   }
  // }
  // IF NO USER CHECK IF THEY'RE TRYING TO LOGIN WITH AN UPDATED / UNCONFIRMED EMAIL
  if (!user) {
    user = await User.findOne({ newEmail: email })
    if (user) {
      throw new UnauthenticatedError(
        'Confirm your updated email before using it'
      )
    }
  }
  // CHECK IF USER EXISTS
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  // IF USER HAS UPDATED BUT UNCONFIRMED EMAIL AND CONFIRMATION TOKEN EXPIRED
  // DELETE UPDATED EMAIL AND REVERT TO OLD EMAIL
  if (user.newEmail && user.confirmationExpires < Date.now()) {
    user.newEmail = undefined
    user.confirmationExpires = undefined
    user.confirmed = true
  }
  if (
    !user.newEmail &&
    !user.confirmed &&
    user.confirmationExpires > Date.now()
  ) {
    // CHECK IF USER CONFIRMED
    throw new BadRequestError('You gotta confirm your email first!')
  }
  // IF CONFIRMATION TOKEN EXPIRED
  if (!user.confirmed && user.confirmationExpires < Date.now()) {
    // IF WE WANT TO RESEND CONFIRMATION TOKEN
    user.confirmationExpires = Date.now() + 24 * 60 * 60 * 1000
    await user.save()
    const token = user.createJWT(false)
    // CREATE URL FOR BTN IN EMAIL - TOKEN AS PARAM
    const url = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/confirmEmail/${token}`
    // SEND TRIAL EMAIL
    user.password = undefined
    user.confirmed = undefined
    user.confirmationExpires = undefined
    await new Email(user, url).sendEmailConfirm()
    throw new BadRequestError(
      "New confirmation email sent. Don't blow it this time"
    )
    // IF WE WANT TO DELETE USER AND MAKE THEM SIGNUP AGAIN
    // if (email) await User.deleteOne({ email })
    // if (username) await User.deleteOne({ username })
    // throw new UnauthenticatedError(
    //   'Too slow. Your confirmation link expired. Please try signing up again'
    // )
  }

  if (!user.active) {
    user.active = true
    user.save()
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

// ********** UPDATE USER * UPDATE USER * UPDATE USER **********
export const updateMe = async (req, res) => {
  const { username, email, emailUpdated } = req.body

  if (!username || !email) {
    throw new BadRequestError("Don't be shy, GIVE US THE INFO")
  }

  const user = await User.findOne({ _id: req.user.userId }).select('+confirmed')

  // IF TRYING TO UPDATE
  // if (email === user.newEmail && user.confirmationExpires > Date.now()) {
  if (email === user.newEmail && user.confirmationExpires > Date.now()) {
    const token = user.createJWT(false)
    const url = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/confirmEmail/${token}`
    await new Email(user, url).sendUpdateEmailConfirm()
    res.status(StatusCodes.OK).json({
      user,
      token: undefined,
      msg: 'Another confirmation link sent to this email. How bout confirming it this time?'
    })
  }

  // IF UPDATED EMAIL IS TAKEN
  if (emailUpdated) {
    let prevUserWithEmail
    prevUserWithEmail = await User.findOne({ email })
    if (!prevUserWithEmail) {
      prevUserWithEmail = await User.findOne({ newEmail: email })
    }
    if (prevUserWithEmail) {
      throw new BadRequestError(
        'User already registered to that email, nice try tho'
      )
    }
  }

  let msg =
    user.username === username
      ? 'Email update confirmation sent! Confirm your new email to complete update'
      : 'Username updated! Confirmation link sent to your updated email'

  user.username = username
  if (emailUpdated) {
    user.newEmail = email
    user.confirmed = false
    user.confirmationExpires = Date.now() + 24 * 60 * 60 * 1000
    // DEV QUICK EXPIRE
    // user.confirmationExpires = Date.now() + 1000
  }

  await user.save()

  if (emailUpdated) {
    const token = user.createJWT(false)
    const url = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/confirmEmail/${token}`
    await new Email(user, url).sendUpdateEmailConfirm()
    res.status(StatusCodes.OK).json({
      user,
      token: undefined,
      msg
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

export const updateAvatar = async (req, res) => {
  const { avatar } = req.body

  const user = await User.findOne({ _id: req.user.userId })

  if (!user) {
    throw new UnauthenticatedError("How'd you get in here. Buh bye now")
  }

  if (!avatar) {
    throw new BadRequestError('What in the world')
  }

  user.avatar = avatar
  await user.save()

  res.status(StatusCodes.OK).json({ user, theme: user.avatar })
}

// ********** UPDATE PASSWORD * UPDATE PASSWORD * UPDATE PASSWORD **********
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

// ********** FORGOT PASSWORD * FORGOT PASSWORD * FORGOT PASSWORD **********
export const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFoundError('User not found. Who the funk are you?')
  }
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  // SEND TOKEN TO EMAIL
  try {
    // DEVELOPMENT URL
    const url = `${req.protocol}://localhost:8080/resetPassword/${resetToken}`

    await new Email(user, url).sendPasswordReset()

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Check your email for the password reset link' })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    throw new ServerError(
      'Apologies fam. Something went wrong, try again later'
    )
  }
}

// ********** RESET PASSWORD * RESET PASSWORD * RESET PASSWORD **********
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  if (!user) {
    throw new BadRequestError(
      'Reset link expired or invalid. Womp womp, try again'
    )
  }
  user.password = newPassword
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  user.passwordChangedAt = Date.now() - 1000
  await user.save()

  user.password = undefined
  const token = user.createJWT(true)

  res.status(StatusCodes.OK).json({ user, token })
}

// ********** REQUEST FRIEND * REQUEST FRIEND * REQUEST FRIEND **********
export const getMyFriends = async (req, res) => {
  const user = await User.findById(req.user.userId).select(
    '+friends +friendRequestsReceived +friendRequestsSent'
  )
  if (!user) {
    throw new UnauthenticatedError('Get out of here imposter!')
  }

  const {
    friends: friendsIds,
    friendRequestsSent: friendRequestsSentIds,
    friendRequestsReceived: friendRequestsReceivedIds
  } = user

  let friends = await Promise.all(
    friendsIds.map(async (id) => {
      const fr = await User.findOne({ _id: id, active: true, confirmed: true })
      if (!fr) return
      const { username, email, avatar } = fr
      return { username, email, avatar }
    })
  )

  console.log(friends)
  let friendRequestsSent = await Promise.all(
    friendRequestsSentIds.map(async (id) => {
      const fr = await User.findOne({ _id: id, active: true, confirmed: true })
      if (!fr) return
      const { username, email, avatar } = fr
      return { username, email, avatar }
    })
  )
  let friendRequestsReceived = await Promise.all(
    friendRequestsReceivedIds.map(async (id) => {
      const fr = await User.findOne({ _id: id, active: true, confirmed: true })
      if (!fr) return
      const { username, email, avatar } = fr
      return { username, email, avatar }
    })
  )

  friends = friends.filter((fr) => fr && fr)
  friendRequestsSent = friendRequestsSent.filter((fr) => fr && fr)
  friendRequestsReceived = friendRequestsReceived.filter((fr) => fr && fr)

  res
    .status(StatusCodes.OK)
    .json({ friends, friendRequestsSent, friendRequestsReceived })
}

// ********** REQUEST FRIEND * REQUEST FRIEND * REQUEST FRIEND **********
export const requestFriend = async (req, res) => {
  const { info } = req.body
  // CHECK FOR FIELD
  if (!info) {
    throw new BadRequestError('Give us something to work with')
  }
  const user = await User.findById(req.user.userId).select(
    '+friendRequestsSent +friendRequestsReceived +friends'
  )

  // CHECK FOR USER
  if (!user) {
    throw new UnauthenticatedError('Get outta here poser!')
  }
  if (user.email === info || user.username === info) {
    throw new BadRequestError(
      "Selflove is good but you can't request yourself, sorry"
    )
  }

  let requestedUser
  requestedUser = await User.findOne({ email: info }).select(
    '+friendRequestsReceived +active +confirmed'
  )
  if (!requestedUser) {
    requestedUser = await User.findOne({ username: info }).select(
      '+friendRequestsReceived +active +confirmed'
    )
  }

  // CHECK FOR REQUESTED USER + IF THEY ACTIVE && CONFIRMED
  if (!requestedUser || !requestedUser.confirmed || !requestedUser.active) {
    throw new BadRequestError(
      "No user with that info. Imaginary friends don't count"
    )
  }
  // IF ALREADY FRIENDS
  if (user.friends.includes(requestedUser._id)) {
    throw new BadRequestError('You already friends!')
  }
  // IF REQUEST ALREADY RECEIVED FROM THAT PERSON
  if (user.friendRequestsReceived.includes(requestedUser._id)) {
    throw new BadRequestError('They already requested you. Confirm your buddy!')
  }
  // IF REQUEST ALREADY SENT
  if (user.friendRequestsSent.includes(requestedUser._id)) {
    throw new BadRequestError(
      'Friend request already sent! Patience is a virtue'
    )
  }

  // UPDATE RELATED FIELDS ON USER DOCUMENTS && SAVE
  user.friendRequestsSent = [...user.friendRequestsSent, requestedUser._id]
  requestedUser.friendRequestsReceived = [
    ...requestedUser.friendRequestsReceived,
    user._id
  ]
  user.save()
  requestedUser.save()

  // REMOVE INFO FOR RESPONSE
  // user.friends = undefined
  // user.friendRequestsSent = undefined
  // user.friendRequestsReceived = undefined
  // requestedUser.friendRequestsReceived = undefined

  // DEV RESPONSE ONLY
  // res.status(StatusCodes.OK).json({ user, requestedUser })

  // SEND NOTIFICATION EMAIL TO REQUESTED USER???
  // const url = ''

  // ACTUAL RESPONSE FOR FRONT END
  res.status(StatusCodes.OK).json({ msg: 'Request Sent!' })
}

// * RESPOND TO FRIEND REQUEST * RESPOND TO FRIEND REQUEST * RESPOND TO FRIEND REQUEST *
export const respondToFriendRequest = async (req, res) => {
  const { email, status } = req.body

  if (!email || !status || (status !== 'accept' && status !== 'reject')) {
    throw new BadRequestError('Error Will Robinson')
  }
  const user = await User.findById(req.user.userId).select(
    '+friends +friendRequestsReceived'
  )
  if (!user) {
    throw new UnauthenticatedError('Not authorized to respond')
  }
  const maybeFriend = await User.findOne({ email }).select(
    '+friends +friendRequestsSent'
  )
  if (!maybeFriend) {
    throw new BadRequestError('No friend found with that email')
  }
  // REMOVE EACH USER'S ID's FROM THE OTHERS RELATED REQUEST FIELDS
  user.friendRequestsReceived = user.friendRequestsReceived.filter(
    (reqUserId) => !reqUserId.equals(maybeFriend._id)
  )
  maybeFriend.friendRequestsSent = maybeFriend.friendRequestsSent.filter(
    (reqUserId) => !reqUserId.equals(user._id)
  )
  let msg = 'Rejected!'
  if (status === 'accept') {
    // ADD TO BOTH USER'S FRIENDS LIST IF NOT ALREADY ON IT
    if (!user.friends.includes(maybeFriend._id)) {
      user.friends = [...user.friends, maybeFriend._id]
    }
    if (!maybeFriend.friends.includes(user._id)) {
      maybeFriend.friends = [...maybeFriend.friends, user._id]
    }

    msg = 'New Buddy Accepted!'
  }
  user.save()
  maybeFriend.save()

  res.status(StatusCodes.OK).json({ msg })
}

// ********** REMOVE FRIEND * REMOVE FRIEND * REMOVE FRIEND **********
export const removeFriend = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError("Can't delete nobody")
  }
  const user = await User.findById(req.user.userId).select('+friends')
  if (!user) {
    throw new UnauthenticatedError('Not Authorized')
  }
  const exFriend = await User.findOne({ email }).select('+friends')
  if (!exFriend) {
    throw new NotFoundError('Friend not found')
  }

  user.friends = user.friends.filter((friend) => !friend.equals(exFriend._id))
  exFriend.friends = exFriend.friends.filter(
    (friend) => !friend.equals(user._id)
  )

  user.save()
  exFriend.save()

  res.status(StatusCodes.OK).json({ msg: 'Unfriended. Uh buh bye now!' })
}

// ********** DELETE ME * DELETE ME * DELETE ME **********
export const deleteMe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { active: false })

    // OR DELETE DOCUMENT
    // await User.findByIdAndDelete(req.user.userId)

    res.status(StatusCodes.NO_CONTENT).json({
      msg: 'success'
    })
  } catch (err) {
    console.log(err.response.data.msg)
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Ooops! Something went wrong, try again later' })
  }
}

// ********** GET ALL USERS * GET ALL USERS * GET ALL USERS **********
export const getAllUsers = async (req, res) => {
  const { sort, search } = req.query

  const queryObject = {}

  if (search) {
    queryObject.username = { $regex: search, $options: 'i' }
  }

  // FIND BASED ON SEARCH
  let result = User.find(queryObject)

  // SORTING CONDITIONS
  if (sort === 'a-z') {
    result = result.sort('username')
  }
  if (sort === 'z-a') {
    result = result.sort('-username')
  }

  // PAGINATION
  // const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 3
  // const skip = (page - 1) * limit

  // result = result.skip(skip).limit(limit)

  const usersFound = await result
  const users = usersFound.map((person) => {
    return {
      username: person.username,
      avatar: person.avatar
    }
  })

  const totalUsers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalUsers / limit)

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages })
}
