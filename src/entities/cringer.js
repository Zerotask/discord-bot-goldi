const mongoose = require('mongoose');

const CringerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
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
  ownLikes: [String],
  foreignLikes: [String],
  matches: [String],
  userPool: [String],
});

const Cringer = mongoose.model('Cringer', CringerSchema);

module.exports = { Cringer };
