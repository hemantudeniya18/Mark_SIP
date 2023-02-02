const mongoose = require('mongoose');

require('../db/database')
const validator = require('validator');
const validate = require('express-validator')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  date:{
        type:String,
        // default:Date.now()
        // require:true,
  },
  duration:{
    type:String,
  },
  event:{
        type:String,
        required:true,
        uppercase:true,
        message: 'Provide Event Name '
  },
  committee:{
        type:String,
        required:true
  },
  budget:{
        type:Number,
  },
  appr:{
      type:String
  },
  member:
  {
    position :[{type:String,uppercase:true}],
    name:[{type:String,uppercase:true}],
    institute:[{type:String,uppercase:true}],
    id:[{type:Number}],
    mobile:[{
      errorMessage: 'Mobile Numbre Length Not More Than 10 Digit (Do not use country code)',
      type:Number,
      // max:10
    }]
  },

  /* pre event winner */
  prewinner:
    {
      round:[{type:String}],
      position:[{type:String,uppercase:true}],
      name :[{type:String,uppercase:true}],
      institute:[{type:String,uppercase:true}],
      id :[{type:Number}],
      mobile:[{
      errorMessage: 'Mobile Numbre Length Not More Than 10 Digit (Do not use country code)',
      type:Number,
      // max:11,
    }],
    prize:[{type:Number}],


  },
  winner:{
    
    position:[{type:String, uppercase:true}],
    name :[{type:String,uppercase:true}],
    institute:[{type:String,uppercase:true}],
    id :[{type:Number}],
    mobile:[{
      error: 'Mobile Numbre Length Not More Than 10 Digit (Do not use country code)',
      type:Number,
      // max:11,
    }],  
    prize:[{type:Number}],
  },
  comp:{
      type:String
  },
  file_name: {
    type: String,
  },
  file :{
    data : Buffer,
    contentType : String
  },
  file_url:
  {
    type: String
  }
}) ;

// const UserModel = new mongoose.model('pre ',UserSchema);
const UserModel = new mongoose.model('users',UserSchema);
module.exports = UserModel





/* 
const reqString = {
  type: String,
  required : true
}

const reqNumber = {
  type: Number,
  required : true
}

const memberSchema = mongoose.Schema(
  {     
    position : reqString,
    name:reqString,
    id:reqNumber,
    mobile:reqNumber
  } 
)
 */