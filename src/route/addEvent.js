const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('../db/database')
const fileUpload= require('express-fileupload')
const userModel = require("../models/userModel");
const User = require('../models/file')
// const cloudinary = require('cloudinary').v2
// const multer = require('multer')
const cloudinary = require("../route/utils/cloudinary");
const upload = require("../route/utils/multer");

/* const cloudinaryStorage = require("multer-storage-cloudinary");
        const parser = multer({ storage: storage });
      /* cloudinary.v2.api.resource('sample', 
        function(error, result) {console.log(result, error)}); */
// var methodOverride = require('method-override');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))
router.use(fileUpload({useTempFiles: true}))



// console.log(cloudinary.config());


                                                            /*  ADD EVENT DATA GET PAGE */
/* router.get('/Add-Event-detail', async(req, res)=> {
  try{
    res.render('addEvent');
  }catch(err){
    res.send(err);
  }
});
 */
/*      show data      */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
     // Create new user
    let user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }}); 

/* router.post('/upload', async(req, res)=>{
  try {
    let path  =  req.body.file
    const result = await cloudinary.uploader.upload(req.file, { public_id: Date.now(), resource_type: "auto" })
 
  console.log(req.files);
  var file_name = req.params.file

  console.log(file);
  cloudinary.uploader.upload(file_name, function(error, result) {console.log(result, error)});
  
    const mycloud =await cloud.v2.uploader.upload(req.body.image,{
      folder:"GRM",
      width:150,
      crop:"scale"
    })
       var fileDetail = new fileModel(
        {
          public_id:mycloud.public_id,
          url:mycloud.secure_url
        })
        await userDetails.save()

  } catch (error) {
    console.log(error);
  }
}); */

router.post('/Add-Event-detail', async (req, res)=>{
  try {
    
    /* const mycloud =await cloud.v2.uploader.upload(req.body.file_file,{
      folder:"GRM",
      width:150,
      crop:"scale"
    }) */
  
   var userDetails = new userModel(
      {
        event: req.body.event,
        date: req.body.date,
        committee:req.body.committee,
        budget:req.body.budget,  
        appr:req.body.appr,
        member:[
          {
          member_name:req.body.namem,
          member_id:req.body.idm,
          member_mobile:req.body.numberm
          }
        ],
        prewinner:[{
          prewinner_name:req.body.prenamew,
          prewinner_id:req.body.preidw,
          prewinner_mobile:req.body.prenumberw,
          prewinner_prize:req.body.preprizew,
        }],
        winner:[{
          winner_name:req.body.namew,
          winner_id:req.body.idw,
          winner_mobile:req.body.numberw,
          winner_prize:req.body.prizew,
        }],
        comp:req.body.comp,
        
    });
      await userDetails.save()
      res.redirect('/show');
      // console.log(userDetails.event + ' ' +'by '+ userDetails.committee + ' Committee was saved!');

  } catch (error) {
    console.log(error);
  }
})

module.exports = router;








 /* 
console.log(req.files);
  var file_name = req.params.file

  console.log(file);
  cloudinary.uploader.upload(file_name, function(error, result) {console.log(result, error)});
  
    const mycloud =await cloud.v2.uploader.upload(req.body.image,{
      folder:"GRM",
      width:150,
      crop:"scale"
    })
      //  var fileDetail = new fileModel(
      //   {
      //     public_id:mycloud.public_id,
      //     url:mycloud.secure_url
      //   })
      //   await userDetails.save()
  

*/
