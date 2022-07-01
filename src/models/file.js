var mongoose = require('mongoose');
require('../db/database')

var FileSchema = new mongoose.Schema({
    // public_id:String,
    // url:String
    name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      cloudinary_id: {
        type: String,
      },
});
  
module.exports = new mongoose.model('fileModel', FileSchema);