const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    id: String,
    namesubject: String
},{
    collection: 'subject'
});
module.exports = mongoose.model('Subject', Subject);