'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: ''
        },
    priority:{
        type:String,
        reqired:true,
        enum:['nulo','baixa','media','alta'],
        default:'nulo'
        },
    done: {
        type:boolean,
        required: true,
        default: false
    }

});

module.exports = mongoose.model('Task',schema);