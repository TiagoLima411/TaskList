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
        enum:['Nula','Baixa','Média','Alta'],
        default:'Nula'
        },
    done: {
        type:Boolean,
        required: true,
        default: false
    },
    createdAt:{
        type: Date,
        default: new Date
        }

});

module.exports = mongoose.model('Task',schema);