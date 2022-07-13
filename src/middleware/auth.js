const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

const logModel = require('../models/logModel')


const auth = async (req, res, next)=>{
  try { 
    const token = req.cookies.jwt;
    const varifyUser = jwt.verify(token, process.env.SECRET_KEY)

    console.log("varify user");
    console.log(varifyUser);
    
    const user = await logModel.findOne({_id:varifyUser._id})
    // console.log(`user : ${user}`);

    req.token = token;
    req.user = user;
    next();
  } 
  catch(error) {
    console.log('not varofy');
    res.status(401).send(error)
  }
}
module.exports = auth ;