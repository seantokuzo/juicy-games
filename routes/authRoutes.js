import express from 'express'
const router = express.Router()

import {
  signup,
  confirmEmail,
  login,
  updateMe,
  updateAvatar,
  updatePassword,
  forgotPassword,
  resetPassword,
  getMyFriends,
  requestFriend,
  respondToFriendRequest,
  removeFriend,
  getAllUsers,
  deleteMe
} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'
import { testUser } from '../middleware/testUser.js'

router.route('/signup').post(signup)
router.route('/confirmEmail/:token').get(confirmEmail)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)
router.route('/getAllUsers').get(getAllUsers)

// USER MUST BE LOGGED IN TO ACCESS THESE ROUTES
router.use(authenticateUser)

router.route('/updateMe').patch(testUser, updateMe)
router.route('/updateAvatar').patch(updateAvatar)
router.route('/updatePassword').patch(testUser, updatePassword)

router.route('/getMyFriends').get(getMyFriends)
router.route('/requestFriend').post(requestFriend)
router.route('/respondToFriendRequest').post(respondToFriendRequest)
router.route('/removeFriend').post(removeFriend)

router.route('/deleteMe').delete(testUser, deleteMe)

export default router
