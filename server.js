var Hapi = require('hapi');
var path = require('path');
var fs = require('fs');


var port = process.env.PORT || 8081;

var app = Hapi.createServer('localhost', port, {
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
    var timesJSON = fs.readFileSync('./output.json', 'utf8');

    reply(timesJSON);
  }
});


app.start(function(){
  console.log('Magic happens on port: ' + app.info.uri);
});


exports = module.exports = app;
