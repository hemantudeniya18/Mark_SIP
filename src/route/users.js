const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const userModel = require("../models/userModel");
const logModel = require("../models/logModel");
var imgModel = require('../models/file');
const { error } = require('console');
const db = require('../db/database')

 //add express middleware
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({extended:true}))

router.get('/show', (req, res) => {
  userModel.find({}, (err, data) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('show', { data: data });
      }
  });
});

/* router.get('/show', function(req, res, next)
{
    userModel.find((err, users) => 
    {
      if(!err)
      {
        res.render("show",{data:users})
      }
      else
      {
        console.log(err);
      }
    }).select({name:1}).sort("date : 1");
  }
) */

/* router.get('/show/report/:id', async(req, res, next) =>
{
  const _id = Object(req.params.id);
  // userModel.findOne({ _id}) 
    await userModel.find(_id,(err, docs)=> {
      if (err){
          res.status(404).send(err);
      }
      else{
          res.render('report', {da:docs});
      }
      })
}) */

router.get('/show/report/:id', async(req, res, next) =>{
  let data = await userModel.findById(req.params.id)
    res.render('report', {da:data});
})

module.exports = router;