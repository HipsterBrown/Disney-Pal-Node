var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

var hoursJSON = fs.readFileSync(path.join(__dirname, './../output.json'), 'utf8');

hoursJSON = JSON.parse(hoursJSON);

module.exports = function(error, response, html) {

  if(!error) {
    var $ = cheerio.load(html);

    var cards = $('body');


    $('.parkHoursList li').each(function(i, elem){
      var data = $(elem);
      var range = data.find('.hours.operating').text();
      var rangeSplit = range.split(' to ');

      var title = data.find('.pkTitle').text().trim();
          title = title.slice(0, title.indexOf('Park')).trim();


      hoursJSON.dl.hours[i] = {
        "id": (i++).toString(),
        "title": title,
        "open": rangeSplit[0],
        "until": rangeSplit[1]
      };
    });
  }

  return fs.writeFile('output.json', JSON.stringify(hoursJSON, null, 4), function(err) {
    console.log('File successfully written! - Check your project directory for the output.json file');

    return 'Check your root directory for output.json';
  });

  //res.json(json);
  //reply(JSON.stringify(hoursJSON));
};
