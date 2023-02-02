const mongoose = require('mongoose');

require('../db/database')
const validator = require('validator');
const validate = require('express-validator')

const Schema = mongoose.Schema
const preSchema = new Schema({
        round:{type:Number,Require:true,default:1},
        // position:[{type:String,uppercase:true}],
        // name :[{type:String,uppercase:true}],
        // institute:[{type:String,uppercase:true}],
        // id :[{type:Number}],
        // mobile:[{type:Number,}],
        // prize:[{type:Number}],
})
const PreModel = new mongoose.model('pre',preSchema);
module.exports = PreModel



// Once delete the model in atlas and try again

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