const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam= new Schema({

    courseID: { type: String },
    subjectName: { type: String },
    examiner: { type: [String] },
    date: { type: String},
    timeStart: { type: String},
    timeStop: { type: String},
    room: { type: String},
    group: { type: String},
    student: { type: [String] }
},{
    collection: 'exam'
});

module.exports = mongoose.model('Exam', Exam);