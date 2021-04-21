const mongoose = require('mongoose');

// @see https://mongoosejs.com/docs/guide.html
const CringerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    default: '-nicht angegeben-',
    trim: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
    default: 69,
  },
  job: {
    type: String,
    default: '-nicht angegeben-',
    trim: true,
  },
  description: {
    type: String,
    default: '-nicht angegeben-',
    trim: true,
  },
  likes: {
    sent: [String],
    received: [String],
  },
  matches: [String],
  userPool: [String],
  show: {
    type: Boolean,
    default: true,
  },
});

const Cringer = mongoose.model('Cringer', CringerSchema);

module.exports = { Cringer };
