const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course= new Schema({

    subjectID: { type: String },
    subjectName: { type: String },
    teacherName: { type: [String] }
},{
    collection: 'course'
});

module.exports = mongoose.model('Course', Course);