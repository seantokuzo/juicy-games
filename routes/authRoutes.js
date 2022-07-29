import express from 'express'
const router = express.Router()

import {
  signup,
  confirmEmail,
  login,
  updateUser,
  updateAvatar,
  updatePassword,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/signup').post(signup)
router.route('/confirmEmail/:token').get(confirmEmail)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateAvatar').patch(authenticateUser, updateAvatar)
router.route('/updatePassword').patch(authenticateUser, updatePassword)

export default router
