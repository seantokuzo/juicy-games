import express from 'express'
const router = express.Router()

import {
  getAllWords,
  getWordOfTheDay,
  getMyBoredle,
  submitGuess,
  getBoredleLeaderboard
} from '../controllers/boredleController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/getBoredleLeaderboard').get(getBoredleLeaderboard)

router.use(authenticateUser)

router.route('/getAllWords').get(getAllWords)
router.route('/getWordOfTheDay').get(getWordOfTheDay)
router.route('/getMyBoredle').get(getMyBoredle)
router.route('/submitGuess').post(submitGuess)

export default router
