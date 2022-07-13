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
    mobile:[{type:Number,}]
  },

  /* pre event winner */
  prewinner:
    {
    position:[{type:String,uppercase:true}],
    name :[{type:String,uppercase:true}],
    institute:[{type:String,uppercase:true}],
    id :[{type:Number}],
    mobile:[{type:Number}],
    prize:[{type:Number}],
  },
  winner:{
    position:[{type:String, uppercase:true}],
    name :[{type:String,uppercase:true}],
    institute:[{type:String,uppercase:true}],
    id :[{type:Number}],
    mobile:[{type:Number}],  
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