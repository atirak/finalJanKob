const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({

    id: { type: String },
    user: { type: String},
    password : { type: String},
    firstname : {type: String},
    lastname : {type: String},
    faculty : {type: String},
    major : {type: String},
    type : {type: String},
},{
    collection: 'teacher'
});

module.exports = mongoose.model('Teacher', Teacher);
