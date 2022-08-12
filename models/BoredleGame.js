import mongoose from 'mongoose'

const BoredleGameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Game must belong to a user']
  },
  currentGame: {
    word: {
      type: mongoose.Schema.ObjectId,
      ref: 'BoredleWord'
    },
    prevGuesses: [
      [
        {
          type: String,
          length: 1
        }
      ]
    ],
    didWin: {
      type: Boolean,
      default: false
    },
    didLose: {
      type: Boolean,
      default: false
    }
  },
  stats: {
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    maxStreak: {
      type: Number,
      default: 0
    },
    guessStats: {
      one: {
        type: Number,
        default: 0
      },
      two: {
        type: Number,
        default: 0
      },
      three: {
        type: Number,
        default: 0
      },
      four: {
        type: Number,
        default: 0
      },
      five: {
        type: Number,
        default: 0
      },
      six: {
        type: Number,
        default: 0
      }
    }
  }
})

BoredleGameSchema.index({ wins: 1 })
BoredleGameSchema.index({ streak: 1 })
BoredleGameSchema.index({ maxStreak: 1 })

export default mongoose.model('BoredleGame', BoredleGameSchema)
