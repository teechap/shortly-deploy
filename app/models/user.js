var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

//make a schema for user
var UserSchema = mongoose.Schema({
  username: {type: String, index: { unique:true }},
  password: String
})
//instantiate the user collection
var User = mongoose.model('User',UserSchema);

//add functions to the collection using the schema
UserSchema.pre('save', function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err){
      callback(err);
    } else{
      callback(isMatch);
    }
  });
},

module.exports = User;
