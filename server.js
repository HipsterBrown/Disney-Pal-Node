var express = require('express');
var cors = require('cors');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(cors());

app.set('port', (process.env.PORT || 8081));

app.get('/', function(req, res) {
  res.send('You can find Disney Times at /times.');
});

app.get('/times', function(req, res) {

  var worldUrl = 'https://disneyworld.disney.go.com/calendars/';
  var landUrl = 'https://disneyland.disney.go.com/calendars/park-hours/';

  /**************
    Data Model

    {
      id: Number,
      title: String,
      open: String,
      until: String
    }
  *************/

  var json = {
    "wdw": {
      "hours": []
    },
    "dl": {
      "hours": []
    }
  };

  request(worldUrl, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);

      $('.clickRow').each(function(i, elem){
        var data = $(this);
        var range = data.find('.hours.range > p').text();
        var rangeSplit = range.split(' ');

        json.wdw.hours[i] = {
          "id": (i++).toString(),
          "title": data.find('.parkName').text(),
          "open": rangeSplit[0],
          "until": rangeSplit[2]
        };
      });

    }

    fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err) {
      console.log('File successfully written! - Check your project directory for the output.json file');


      request(landUrl, function(error, response, html) {
        if(!error) {
          var $ = cheerio.load(html);

          var cards = $('body');


          $('.parkHoursList li').each(function(i, elem){
            var data = $(elem);
            var range = data.find('.hours.operating').text();
            var rangeSplit = range.split(' to ');

            var title = data.find('.pkTitle').text().trim();
                title = title.slice(0, title.indexOf('Park')).trim();


            json.dl.hours[i] = {
              "id": (i++).toString(),
              "title": title,
              "open": rangeSplit[0],
              "until": rangeSplit[1]
            };
          });
        }

        fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err) {
          console.log('File successfully written! - Check your project directory for the output.json file');
        });

        //res.setHeader('Content-Type', 'application/json');

        res.json(json);
        //res.send(200);

      });
    });

  });

});

app.listen(app.get('port'), function() {
  console.log('Magic happens on port: ' + app.get('port'));
});



exports = module.exports = app;
