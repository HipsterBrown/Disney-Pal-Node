var Hapi = require('hapi');
var path = require('path');
var fs = require('fs');
var AWS = require('aws-sdk');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
AWS.config.region = 'us-east-1';
var s3 = new AWS.S3();
var params = {
  Bucket: 'disneypal',
  Key: 'times'
};

var port = process.env.PORT || 8081;

var app = Hapi.createServer('0.0.0.0', port, {
  cors: true
});

app.route({
  method: 'GET',
  path: '/',
  handler: function(req, reply) {
    reply('You can find Disney Times at /times.');
  }
});

app.route({
  method: 'GET',
  path: '/times',
  handler: function(req, reply) {
    var timesJSON = fs.createWriteStream('times.json');

    //timesJSON = JSON.parse(timesJSON);

    timesJSON.on('pipe', function(src) {
      console.log('Piping, piping, piping...');
    });

    timesJSON.on('finish', function(){
      console.log('Finished writing file.');
      reply.file('times.json');
    });

    s3.getObject(params).createReadStream().pipe(timesJSON);

    console.log('Replying with file stream.');
  }
});

app.route({
  method: 'GET',
  path: '/scrape',
  handler: require('./lib/writeTimes')
});


app.start(function(){
  console.log('Magic happens on port: ' + app.info.uri);
});


exports = module.exports = app;
