var express = require('express')
  , morgan = require('morgan')
  , fs = require('fs')
  , path = require('path')
  , multipart = require('connect-multiparty')
  , sizeOf = require('image-size');

var app = express();
app.use(express.static('./'));
app.use(morgan('dev'));

app.listen( 3002);
console.log('Node.js Ajax Upload File running at: http://0.0.0.0:3002');

app.post('/uploadimage', multipart(), function(req, res){
  //get filename
  console.log(req.files)
  console.log("req.body")
  console.log(req.body)

  var filename = req.files.files.originalFilename || path.basename(req.files.files.path);
  //copy file to a public directory
  var targetPath = path.dirname(__filename) + '/image/' + filename;
  //copy file
  fs.createReadStream(req.files.files.path).pipe(fs.createWriteStream(targetPath));
  //return file url
  console.log(targetPath)

  var dimensions = sizeOf(targetPath)

  res.json(
    {
      code: 200, 
      msg: {
        url: 'http://' + req.headers.host + '/node/image/' + filename,
        width: dimensions.width,
        height: dimensions.height
      }
    });
});

// app.get('/env', function(req, res){
//   console.log("process.env.VCAP_SERVICES: ", process.env.VCAP_SERVICES);
//   console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);
//   console.log("process.env.VCAP_APPLICATION: ", process.env.VCAP_APPLICATION);
//   res.json({
//     code: 200
//     , msg: {
//       VCAP_SERVICES: process.env.VCAP_SERVICES
//       , DATABASE_URL: process.env.DATABASE_URL
//     }
//   });
// });



