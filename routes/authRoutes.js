import express from 'express'
const router = express.Router()

import {
  signup,
  login,
  updateMe,
  updatePassword
} from '../controllers/authController.js'

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/updateMe').post(updateMe)
router.route('/updatePassword').post(updatePassword)

export default router
