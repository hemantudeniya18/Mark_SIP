var express = require('express')
var bodyParser = require('body-parser')
const memrouter = express.Router();
// const path = require('path')
const memModel = require('../models/memModel');
const userModel = require('../models/userModel')
memrouter.use(bodyParser.json())
memrouter.use(bodyParser.urlencoded({ extended: false }))



memrouter.post('/Add-Event-detail', async (req, res)=>{
  try {
   var memDetails = await new memModel(
      {
        _id : req.params._id,
        position :req.body.posm,
        name:req.body.namem,
        id:req.body.idm,
        mobile:req.body.numberm,
      });
    
      await memDetails.save()
  } catch (error) {
    console.log(error);
  }
})



module.exports = memrouter;


