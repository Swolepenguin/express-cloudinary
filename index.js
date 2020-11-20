const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const multer = require('multer')
const cloudinary = require('cloudinary')

require('dotenv').config();

//app and port
const app = express();
const PORT = process.env.PORT || 3000;
const uploads = multer({dest:'./uploads'})
//middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', uploads.single('inputFile'), (req,res)=>{
  console.log('on post route');

  //get input from user 
  let file = req.file.path;
  console.log(req);

  cloudinary.uploader.upload(file, (result)=>{
    console.log(result);
//render result page with image
    res.render('result', {image: result.url});
  })
})

//server listening on port
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
