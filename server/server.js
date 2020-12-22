const express= require('express')
const multer=require('multer')
const path= require('path')
const models= require('./model')

const app= express();
const mongoose= require('mongoose');
const model = require('./model');
app.get('/',(req, res) => {
    res.send('We are at home')
 
 });
 
 app.use('/uploads', express.static(__dirname +'/uploads'));
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  app.post('/upload', upload.single('myFile'), async(req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("hey error")
    }
      
      
      const imagepost= new model({
        image: file.path
      })
      const savedimage= await imagepost.save()
      res.json(savedimage)
    
  })

  app.get('/image',async(req, res)=>{
   const image = await model.find()
   res.json(image)
   
  })

mongoose.connect(MONGO_DB_URL,{ useNewUrlParser: true },()=>{
  console.log('db connnected')
})
app.listen(3000);
