'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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
        reqired:true,
        enum:['nulo','baixa','media','alta'],
        default:'nulo'
        }

});

module.exports = mongoose.model('Task',schema);