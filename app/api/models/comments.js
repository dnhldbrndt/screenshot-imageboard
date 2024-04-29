/*jshint esversion: 6 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comments = new Schema({
  id: {
    type: Number,
    required: true,
	},
  name: {
    type: String,
    required: true
  },
  screenshotid: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true
  },
  comment_date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('comments', comments);
