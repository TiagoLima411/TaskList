'use strict'

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema({
	titleProj: {
		type: String,
		required: true
	},
	tasks:[{
		description: {
			type: String,
			required: true
		},
		date:{
			type: Date,
			required: true
		},
		priority:{
			type:String,
			reqired:true
		}
	}]
});
 
module.exports = mongoose.model('Project', schema);