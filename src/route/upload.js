const express = require('express')
const bodyParser = require('body-parser')
const uploadrouter = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const { cookie } = require('express-validator');
const path = require('path')
const multer = require('multer')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const userModel = require("../models/userModel");
const logModel = require('../models/logModel');

uploadrouter.use(bodyParser.json())
uploadrouter.use(cookieParser())
uploadrouter.use(bodyParser.urlencoded({ extended: false }))
dotenv.config();

var storage = multer.diskStorage({
  destination: function(req,file, callback) {
    callback(null, './public/files')    
  },
  filename : function(req, file, callback){
    callback(null, req.body.file_name+''+ path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });

// /Add-Event-detail


uploadrouter.get('/', (req, res) => {
  userModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('index', { data: items });
        }
    });
});

 /* sign in get */
uploadrouter.get('/Sign-in', async(req, res)=> {
    try{
      res.render('signin');
    }catch(err){
      console.log(err);
     }
    });

/* Sign in post page */
uploadrouter.post("/Sign-in", async(req, res)=>
{
  try {
      const email = req.body.email;
      const password = req.body.password;

      const useremail = await logModel.findOne({email:email})

      const isMatch = await bcrypt.compare(password, useremail.password)

      const token = await useremail.generateAutoToken();

      console.log(`token(/signin): ${token}`);
      
      
    
      if(isMatch){
        res.cookie("jwt", token,{
          expires: new Date(Date.now() + 600000),
          httpOnly:true
        })
        res.redirect('/Add-Event-detail')
      }
      else{
        res.status(201).send('Invalid Login Details!!!')
      }
  } catch (error) {
    res.status(401).send('Invalid Login Details##')
    console.log(error);
  }
 

})

uploadrouter.get('/report', (req, res) => {
  userModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('report', { data: items });
        }
    });
});
uploadrouter.get('/Sign-up', (req, res) => {
  try {
    res.render('signup')
  } catch (e) {
    res.status(400).send(e)
  }
});
uploadrouter.post('/Sign-up', async (req, res)=>{
  try
   {
    const  password = req.body.password;
    const CNFpassword = req.body.CNFpassword;  
    
    if(password === CNFpassword)
    {
      var loginDetails = new logModel(
        {
          username: req.body.username,
          email: req.body.email,
          password:req.body.password,
          CNFpassword:req.body.CNFpassword,  
        })

      const token = await loginDetails.generateAutoToken();
      console.log(`token signup : ${token}`);

      res.cookie("jwt", token,{
        expires: new Date(Date.now() + 60*1000),
        httpOnly:true,
        // secure:true  //only for https
      })
      console.log(`This is cookies(/signup) : ${cookie}`);


      const registerLoginData = await loginDetails.save()
      console.log(`register user : ${registerLoginData}`);
      res.render('signin')   
    }
    else{
      res.send('Password Not Matching')
    };
    }
    catch(error) 
    {
      res.send(error);
  }
})

uploadrouter.get('/Add-Event-detail', auth ,async(req, res)=> {
  try{
    console.log(`This is cookies(get.addeventdetail) : ${req.cookies.jwt}`);
      res.render('addEvent');
  }catch(err){
    res.send(err);
  }
});

uploadrouter.post('/Add-Event-detail', async (req, res)=>{
  try {
    await new userModel({
      event: req.body.event,
      date: req.body.date,

      duration:req.body.duration,
      committee:req.body.committee,
      budget:req.body.budget,  
      appr:req.body.appr,
      member:{
        position:req.body.posm,
        name:req.body.namem,
        institute:req.body.insm,
        id:req.body.idm,
        mobile:req.body.numberm
      },
      prewinner:{
        round:req.body.roundname,
        position:req.body.preposw,
        name:req.body.prenamew,
        id:req.body.preidw,
        institute:req.body.preinsw,
        mobile:req.body.prenumberw,
        prize:req.body.preprizew,
      },

        winner:{
          position:req.body.posw,
          name:req.body.namew,
          id:req.body.idw,
          institute:req.body.insw,
          mobile:req.body.numberw,
          prize:req.body.prizew,
        },
        comp:req.body.comp,      
   }).save()
   res.redirect('/show');
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
uploadrouter.get('/upload', auth, async(req,res)=>{
  try {
    res.status(200).render('upload')
  } catch (error) {
    console.log(error);
  }
})
uploadrouter.post('/upload', upload.single("myFile"), async(req,res)=>{
  try {
    let Event = req.body.event;
    console.log(Event);
    var userResult = await userModel.findOne(
      {
        Event : userModel.event
      }
    )
    console.log(userResult);
    if(userResult){
      await userModel.updateOne({event:Event}, {$set:{file_name:req.file.filename}})
          userResult.file_name = req.file.path,
          userResult.file={
            data : req.file.filename,
            contentType : req.file.mimetype,
          },
          userResult.file_url = req.file.path,
        console.log(req.file);
        res.redirect('/show');
    }
    else{
      console.log("wrong fetching")
    } 
  } catch (error) {
    res.status(400).send(error)
  }
})

uploadrouter.get('/show/:id',auth,function(req,res){
  userModel.findByIdAndRemove(req.params.id,(err,doc)=>{
     if (!err)
       {
       res.redirect('/show');
       }
     else 
       {
       console.log('Failed to Delete Course Details: ' + err);
       }
  });
});
uploadrouter.get('/update/:id',auth, (req, res) => {
  userModel.findById({_id:req.params.id},req.body, { new: true },(err,docs)=>{
     if(err)
     {
         console.log('Cant retrieve date and edit');
     }
     else
     {
         res.render('edit',{up:docs});
     }
  })
});

uploadrouter.post('/update/:id',(req,res)=>{
  userModel.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
      if(err)
      {
          console.log(err);
      }  
      else
      {  
          res.redirect('/show');
      }
  });
});

uploadrouter.get('/logout', auth, async(req, res)=>{
  try {
    res.clearCookie("jwt") 
    console.log('logout');
    await req.user.save();    
    res.redirect('/show')

  } catch(error) {
    res.status(500).send(error)
  }
})

module.exports = uploadrouter;