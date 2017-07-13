'use strict';
const Sequelize = require('sequelize')
const db = require('../index.js')


const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    //causing issue with plain file - check docs
    // validate: {
    //   isUrl: true
    // }
  }

});

module.exports = Campus;
