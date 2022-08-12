import express from 'express'
const router = express.Router()

import {
  getAllWords,
  getWordOfTheDay,
  submitGuess
} from '../controllers/boredleController.js'

import authenticateUser from '../middleware/auth.js'

router.use(authenticateUser)

router.route('/getAllWords').get(getAllWords)
router.route('/getWordOfTheDay').get(getWordOfTheDay)
router.route('/submitGuess').patch(submitGuess)

export default router
