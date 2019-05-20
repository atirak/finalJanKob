const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    groupID: {type:Number},
    courseID:{type:String},
    student: {type:[String]},
    amount: {type:Number},

},{
    collection: 'group'
});
module.exports = mongoose.model('Group', Group);