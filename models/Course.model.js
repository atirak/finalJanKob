const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course= new Schema({
    subjectName: { type: String },
    teacherName: { type: [String] }
},{
    collection: 'course'
});

module.exports = mongoose.model('Course', Course);