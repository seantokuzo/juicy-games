import mongoose from 'mongoose'

const BoredleWordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'Need a word please'],
    length: 6,
    unique: [true, 'Word already used']
  },
  timeBegins: {
    type: Date,
    required: [true, 'Need a start date']
  },
  timeExpires: {
    type: Date,
    required: [true, 'Need a start date']
  }
})

BoredleWordSchema.index({ timeBegins: 1 })
// BoredleWordSchema.index({ word: 1 })

export default mongoose.model('BoredleWord', BoredleWordSchema)
