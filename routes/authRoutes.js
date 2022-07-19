import express from 'express'
const router = express.Router()

import {
  signup,
  login,
  updateMe,
  updatePassword
} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/updateMe').post(authenticateUser, updateMe)
router.route('/updatePassword').post(authenticateUser, updatePassword)

export default router
