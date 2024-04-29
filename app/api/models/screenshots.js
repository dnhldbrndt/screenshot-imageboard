/*jshint esversion: 6 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const screenshots = new Schema({
  id: {
	type: Number,
	required: true,
	},
  title: {
	type: String,
	required: true
  },
  film: {
    type: String,
    required: true
  },
  imgsrc: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: false
  }],
  flag: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('screenshots', screenshots);
