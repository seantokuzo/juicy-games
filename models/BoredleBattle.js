import mongoose from 'mongoose'

const BoredleBattleSchema = new mongoose.Schema({
  word: {
    type: String,
    length: 5,
    required: [true, 'Boredle Battle must have a word']
  },
  player1: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Game must have a player1'],
      select: false
    },
    score: {
      type: Number,
      default: 0,
      required: [true, 'Player 1 must have a score'],
      validate: [(val) => val >= 0, 'Score must >= 0']
    },
    prevGuesses: {
      type: [
        {
          type: [
            {
              type: String,
              length: 1,
              required: [true, 'No empty guesses']
            }
          ],
          validate: [
            (guessArr) => guessArr.length === 5,
            'Guess needs to be 5 letters long'
          ]
        }
      ],
      validate: [(guessesArr) => guessesArr.length <= 6, 'Maximum 6 guesses']
    }
  },
  player2: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Game must have a player1'],
      select: false
    },
    score: {
      type: Number,
      default: 0,
      required: [true, 'Player 1 must have a score'],
      validate: [(val) => val >= 0, 'Score must >= 0']
    },
    prevGuesses: {
      type: [
        {
          type: [
            {
              type: String,
              length: 1,
              required: [true, 'No empty guesses']
            }
          ],
          validate: [
            (guessArr) => guessArr.length === 5,
            'Guess needs to be 5 letters long'
          ]
        }
      ],
      validate: [(guessesArr) => guessesArr.length <= 6, 'Maximum 6 guesses']
    }
  },
  gameStatus: {
    status: {
      type: String,
      enum: ['active', 'finished']
    },
  }
})

BoredleBattleSchema.pre(/^find/, function () {
  this.populate({
    path: 'user1',
    select: 'username avatar'
  })
  this.populate({
    path: 'user2',
    select: 'username avatar'
  })
})
