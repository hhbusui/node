
var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    status:{type:String}
});

module.exports = mongoose.model('users', usersSchema);