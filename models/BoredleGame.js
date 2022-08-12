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
    ]
  },
  stats: {
    wins: {
      type: Number,
      default: 0,
      required: true
    },
    losses: {
      type: Number,
      default: 0,
      required: true
    },
    streak: {
      type: Number,
      default: 0,
      required: true
    },
    maxStreak: {
      type: Number,
      default: 0,
      required: true
    },
    guessStats: {
      one: {
        type: Number,
        default: 0,
        required: true
      },
      two: {
        type: Number,
        default: 0,
        required: true
      },
      three: {
        type: Number,
        default: 0,
        required: true
      },
      four: {
        type: Number,
        default: 0,
        required: true
      },
      five: {
        type: Number,
        default: 0,
        required: true
      },
      six: {
        type: Number,
        default: 0,
        required: true
      }
    }
  }
})

BoredleGameSchema.index({ wins: 1 })
BoredleGameSchema.index({ streak: 1 })
BoredleGameSchema.index({ maxStreak: 1 })

export default mongoose.model('BoredleWord', BoredleWordSchema)
