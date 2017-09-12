'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema({
	titleProj: {
		type: String,
		required: true,
		default: 'nulo'
	}
	
});
 
module.exports = mongoose.model('Project', schema);