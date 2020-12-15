const express= require('express')
const multer=require('multer')
const path= require('path')
const helpers = require('./helper')
const app= express();

app.get('/',(req, res) => {
    res.send('We are at home')
 
 });
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  app.post('/upload', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("hey error")
    }
      res.send(file)
    
  })


app.listen(3000);