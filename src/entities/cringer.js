const Sequelize = require('sequelize');
const { db } = require('../db');

const Cringer = db.define('cringers', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: Sequelize.STRING,
  job: {
    type: Sequelize.STRING,
    defaultValue: 'Arbeitslos',
  },
  gender: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 69,
    allowNull: false,
  },
});

module.exports = { Cringer };
