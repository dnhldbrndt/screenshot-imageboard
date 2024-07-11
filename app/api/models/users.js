/*jshint esversion: 6 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
  id:  {
	primaryKey: true,
	type: Number,
	allowNull: false,
	autoIncrement: true
  },
  name: {
    type: String,
	is: ["^[a-z]+$", 'i'],
	allowNull: false,
	required: true,
  },
  password: {
    type: String,
	allowNull: false,
	len: [2, 10],
	required: true
  }
});

module.exports = mongoose.model('users', users);
