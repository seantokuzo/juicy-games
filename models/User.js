import crypto from 'crypto'
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your name'],
    minlength: 3,
    maxlength: 16,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    },
    unique: true
  },
  newEmail: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'quiz-master', 'admin'],
    default: 'user'
  },
  dateJoined: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  confirmationExpires: Date,
  confirmed: {
    type: Boolean,
    default: false,
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

UserSchema.pre('save', async function () {
  // CHECK IF PASSWORD IS MODIFIED
  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function (confirmed) {
  if (confirmed) {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME
    })
  }
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_CONFIRM_LIFETIME
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  console.log({ resetToken }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

export default mongoose.model('User', UserSchema)
