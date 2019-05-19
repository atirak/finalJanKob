const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Person= new Schema({

    id: { type: String },
    name: { type: String },
    lastname: { type: String },
    type: { type: String},
    user: { type: String},
    password : { type: String}
},{
    collection: 'person'
});

module.exports = mongoose.model('Person', Person);
