var express = require('express')
var bodyParser = require('body-parser');
const uploadrouter = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookiePaarser = require('cookie-parser')
const dotenv = require('dotenv')
require('../db/database')
var user = require('../models/userModel')
var logModel = require('../models/logModel');
const { cookie } = require('express-validator');


uploadrouter.use(bodyParser.json())
uploadrouter.use(cookiePaarser( ))
uploadrouter.use(bodyParser.urlencoded({ extended: false }))

dotenv.config();

// let date_ob = new Date();
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './src/uploads/')
//     },
//     filename:function(req,file,cb){
//         cb(null, req.body.file_name+''+ path.extname(file.originalname));
//       }
// });
  
// var upload = multer({ storage: storage });



uploadrouter.get('/', (req, res) => {
    user.find({}, (err, items) => {
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
uploadrouter.post("/Sign-in", async(req, res)=>{
  // var logData = new logModel(req.body);
  // console.log(req.file);
  try {
      const email = req.body.email;
      const password = req.body.password;
      console.log('noob');
      console.log(email + password);
      const useremail = await logModel.findOne({email:email})
      console.log(useremail);
      
      const isMatch = await bcrypt.compare(password, useremail.password)
      
      const token = await useremail.generateAutoToken();
      console.log("token part  " + token);


      res.cookie("jwt", token,{
        expires: new Date(Date.now() + 600000),
        httpOnly:true,
      })
      console.log(`This is cookies  ${req.cookies.jwt}`);



      if(isMatch){
        res.render('addEvent')
        // res.redirect('/Add-Event-detail')
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
    user.find({}, (err, items) => {
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

        const registerd = await loginDetails.save()
        res.redirect('/show');
    }
    else{
      res.send('Password Not Matching')
    };
    }
    catch (error) 
    {
      res.send(error);
  }
})


module.exports = uploadrouter

/* date_ob.getDate() + '' + date_ob.getMonth()+'' + date_ob.getFullYear()+date_ob.getHours()+''+date_ob.getMinutes()+''+date_ob.getSeconds()+ */