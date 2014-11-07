var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var landUrl = 'https://disneyland.disney.go.com/calendars/park-hours/';

var hoursJSON = {
  'timeStamp': new Date().toString(),
  "wdw": {
    "hours": []
  },
  "dl": {
    "hours": []
  }
};

module.exports = function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);

      $('.clickRow').each(function(i, elem){
        var data = $(this);
        var range = data.find('.hours.range > p').text();
        var rangeSplit = range.split(' ');

        hoursJSON.wdw.hours[i] = {
          "id": (i++).toString(),
          "title": data.find('.parkName').text(),
          "open": rangeSplit[0],
          "until": rangeSplit[2]
        };
      });

    }

    return fs.writeFile('output.json', JSON.stringify(hoursJSON, null, 4), function(err) {
      console.log('File successfully written! - Check your project directory for the output.json file');

      return request(landUrl, require('./scrapeDL'));
    });

};
