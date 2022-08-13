import express from 'express'
const router = express.Router()

import {
  getAllWords,
  getWordOfTheDay,
  getMyBoredle,
  submitGuess
} from '../controllers/boredleController.js'

import authenticateUser from '../middleware/auth.js'

router.use(authenticateUser)

router.route('/getAllWords').get(getAllWords)
router.route('/getWordOfTheDay').get(getWordOfTheDay)
router.route('/getMyBoredle').get(getMyBoredle)
router.route('/submitGuess').patch(submitGuess)

export default router
