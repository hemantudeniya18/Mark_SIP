const express = require('express');
const { model } = require('mongoose');
const r = express.Router();
const cloudinary = require('./utils/cloudinary')

const upload = require('./utils/multer')
console.log(cloudinary.config());

r.post('/upload', upload.single('file'), async(req, res)=>{
        try {
          const result = await cloudinary.uploader.upload(req.file.path)
          console.log(result)
        } catch (error) {
          console.log(error);
        }
})

module.exports = r