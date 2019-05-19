const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Build = new Schema({

    name: { type: String },
    namefull: { type: String }
}, {
        collection: 'build'
    });

module.exports = mongoose.model('Build', Build);