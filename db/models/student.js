'use strict';
const Sequelize = require('sequelize')
const db = require('../index.js')


const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }

});

module.exports = Student;
