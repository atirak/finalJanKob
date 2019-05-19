const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Official = new Schema({

    id: { type: String },
    user: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    status: { type: String },
    type: { type: String },
}, {
        collection: 'official'
    });

module.exports = mongoose.model('Official', Official);