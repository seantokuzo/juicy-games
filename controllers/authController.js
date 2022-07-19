import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'

export const signup = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new Error('Poopsicle')
  }

  res.status(StatusCodes.CREATED).json(req.body)
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
