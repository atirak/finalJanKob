const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coin = new Schema({
    
    name: { type: String },
    namefull: { type: String }
},{
    collection: 'build'
});

module.exports = mongoose.model('Coin', Coin);