/*jshint esversion: 6 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blacklist = new Schema({
  token:  {
	type: String,
	required: true,
	ref: "User"
  }
}, {timestamps: true} );

module.exports = mongoose.model('blacklist', blacklist);
