const mongoose = require('mongoose');
const validator = require('express-validator');
require('../db/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config();


const LogSchema = mongoose.Schema({
  username : {
    type:String,
    require:true,  
  },
  email : 
    {
      type : String,
      require:true,
      unique : [true,"Alredy login"],
      validator(val)
      {
        if(!validator.isEmail(val))
        {
              throw new Error("Invalid Email")
        }
      }
      },
  password:{
        type:String,
        require:true,
        // min:6
  },
  tokens:[{
      token:{
        type:String,
        require:true,
      }
    }]
  /* CNFpassword:{
    type:String,
    // require:true,
    min:3
}, */
}
);


/* Generating token  */
LogSchema.methods.generateAutoToken = async function() {
  try {
    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token
    console.log(`logmodel.js (line:54)${token}`);
  } catch (error) {
    res.send("Error is(logmodel.js) : " + error);
    console.log("Error is(logmodel.js) : " + error);
  }  
  
}


/*  covert password into Hash  */
  LogSchema.pre("save", async function(next) 
  {
    if(this.isModified("password"))
    {
      // const passwordHash = await bcrypt.hash(password, 10);
      // console.log(`password is : ${this.password}`);   f
      this.password = await bcrypt.hash(this.password, 10)
      // console.log(`password is : ${this.password}`);
    }
    next();
  })


const logModel = new mongoose.model('login',LogSchema);
module.exports = logModel


/* 
 const token = await useremail.generateAutoToken();
      console.log("token is (line:58) : " + token);


      res.cookie("jwt", token,{
        expires: new Date(Date.now() + 600000),
        httpOnly:true,
        // secure:true  //only for https
      })
      console.log(`This is cookies(line:65) : ${cookie}`);
      console.log(`This is cookies(line:66) : ${req.cookies.jwt}`); 
*/