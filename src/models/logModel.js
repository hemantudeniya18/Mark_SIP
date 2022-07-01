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
        min:6
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

LogSchema.methods.generateAutoToken = async function(next) {
  try {
    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token
    console.log(token);
  } catch (error) {
    res.send("Error is : " + error);
    console.log("Error is : " + error);
  }
  
}

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