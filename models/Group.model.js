const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    groupID: Number,
    amount: Number
},{
    collection: 'group'
});
module.exports = mongoose.model('Group', Group);