const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const userModel = require("../models/userModel");
const logModel = require("../models/logModel");
// var imgModel = require('../models/file');
const { error } = require('console');
const db = require('../db/database')


 /* router.get('/index', async(req,res)=>{
  try {
    res.render('index')
  } catch (error) {
    console.log(error);
  }
 }) */
router.get('/show', (req, res) => {
  userModel.find({},null,{sort: {date: -1}}, function(err, data){
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
        // console.log(data);
          res.render('show', { data: data });
      }
  })

});


router.get('/show/report/:id', async(req, res, next) =>{
  let data = await userModel.findById(req.params.id)
  
    res.render('report', {da:data});
})

module.exports = router;