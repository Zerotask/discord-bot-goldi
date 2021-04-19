const Sequelize = require('sequelize');

const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage: `${process.env.SQL_PATH}/db.sqlite`,
});

module.exports = { db };
