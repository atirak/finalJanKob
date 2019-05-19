const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({

    name: { type: String },
    namebuild: { type: String },
    typeroom: {type:String},
    row:{type:Number},
    column:{type:Number}

}, {
        collection: 'room'
    });

module.exports = mongoose.model('Room', Room);