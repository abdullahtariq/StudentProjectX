'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var studentInformation = new Schema({
  "firstName": String, 
  "lastName": String,
  "fatherName": String,
  "dob" : String,
  "regNumber" : String,
  "class" : String,
  "address" : String,
  "phone" : Number,
  "username" : String,
  "password" : String,
  "gender" : String,
  "email" : String,
  "approved": {
    type: Boolean,
    default : false
  }
})

module.exports = mongoose.model('students', studentInformation);

