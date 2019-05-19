const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    
    user: {type: String},
    pass : String,
    name: String,
    lastname: String,
    type : String
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User);
