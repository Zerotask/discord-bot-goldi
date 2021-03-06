require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', () => console.log(`Could not connect with MongoDB: ${connectionString}`));
db.once('open', () => {
  console.log('Connected to MongoDB.');
});

module.exports = { db };
