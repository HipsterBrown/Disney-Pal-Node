Disney Pal Node App
===

The server app behind the [Disney Pal Watch App](https://github.com/HipsterBrown/DisneyPal).

In its current form, a simple web scraper for fetching the hours of operation for the US Disney Parks and serving them as a JSON blob to the javascript middleware running via the Pebble iOS app to the watch. The app contains a node script for fetching the data and storing it on AWS S3, to be run every morning through a Heroku Scheduler task.

**Powered By:**

- hapi
- cheerio
- request
- aws-sdk- 


---

TODO
---

- Clean up JSON
- Internationalization?
- Event Reminders Endpoint
- Wait Times Data from [Disney Wait Times](http://disneywaittimes.com/)


Please feel free to contribute and suggest any improvements as it is my first Node app.
