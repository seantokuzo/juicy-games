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
  resetPassword,
  deleteMe
} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/signup').post(signup)
router.route('/confirmEmail/:token').get(confirmEmail)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)

// USER MUST BE LOGGED IN TO ACCESS THESE ROUTES
router.use(authenticateUser)

router.route('/updateUser').patch(updateUser)
router.route('/updateAvatar').patch(updateAvatar)
router.route('/updatePassword').patch(updatePassword)
router.route('/deleteMe').delete(deleteMe)

export default router
