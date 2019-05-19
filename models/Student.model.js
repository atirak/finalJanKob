const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({

    id: { type: String },
    user: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    tier: { type: Number },
    faculty: { type: String },
    major: { type: String },
    type: { type: String },
}, {
        collection: 'student'
    });

module.exports = mongoose.model('Student', Student);
