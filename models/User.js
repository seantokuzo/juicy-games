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
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!! Doesn't work on findOne or update
      validator: function (el) {
        return el === this.password
      },
      message: "Them passwords don't match homie"
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

