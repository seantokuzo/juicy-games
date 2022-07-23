import express from 'express'
const router = express.Router()

import {
  signup,
  login,
  updateUser,
  updatePassword
} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updatePassword').patch(authenticateUser, updatePassword)

export default router
