var request = require('request');

var worldUrl = 'https://disneyworld.disney.go.com/calendars/';

module.exports = function(req, reply) {

  /**************
    Data Model

    {
      id: Number,
      title: String,
      open: String,
      until: String
    }
  *************/

  reply( request(worldUrl, require('./scrapeWDW')) );

};
