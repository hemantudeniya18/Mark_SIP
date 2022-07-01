const mongoose = require('mongoose');
require('../db/database')
const validator = require('express-validator');
const UserSchema = mongoose.Schema({
  date:{
        type:Date,
        default:Date.now()
        
  },
  event:{
        type:String,
        require:true,
        uppercase:true
  },
  committee:{
        type:String,
        require:true
  },
  budget:{
        type:Number
  },
  appr:{
      type:String
  },
  member:
  [
    {
      /* member_name :String,
      member_id: Number,
      member_mobile:Number */
      member_name :
      [{
      type:String
      }],
      member_id :
      [{
      type:Number
      }],
      member_mobile:
      [{
      type:Number,
      min:10,
      }]
    }
  ],

  /* pree event winner */
  prewinner:[{
    prewinner_name :[{
      type:String
    }],
    prewinner_id :[{
      type:Number
    }],
    prewinner_mobile:[{
      type:Number
    }],
    prewinner_prize:[{
      type:Number
    }],
    prewinner_file:{
      type:String,
      default:Date.now()
    }
  }],
    winner:[{
    winner_name :[{
      type:String
    }],
    winner_id :[{
      type:Number
    }],
    winner_mobile:[{
      type:Number
    }],
    winner_prize:[{
      type:Number
    }]
  }],
  comp:{
      type:String
  },
  file_id:{
    type: String
  },
  file_url:
  {
    type: String
  }
}
) ;

const userModel = new mongoose.model('users',UserSchema);
module.exports = userModel
