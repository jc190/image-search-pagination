const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config/api');
const searchRecord = require('../../models/searchRecord');

router.get('/', (req, res) => {
  // Set header for json
  res.setHeader('Content-Type', 'application/json');
  if (!req.query.term) {
    return res.send({
      "error": "No search term provided."
    })
  }
  // -----------------------------------
  // TODO: Log search terms to database
  // -----------------------------------
  const newRecord = new searchRecord({
    searchTerm: req.query.term,
    timeStamp: Date.now().toString()
  });
  searchRecord.recordSearch(newRecord).then(() => {
    console.log("Record stored.");
  });
  request(
    {
      url: 'https://www.googleapis.com/customsearch/v1?searchType=image'
            + '&q=' + req.query.term
            + '&start=' + (req.query.offset ? req.query.offset : "1")
            + '&key=' + config.googleCSE.key
            + '&cx=' + config.googleCSE.cx,
      json: true
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        return res.send({
          "error": "Unable to process request."
        });
      }
      const data = body.items.map((item) => {
        return {
          url: item.link,
          snippet: item.title,
          thumbnail: item.image.thumbnailLink,
          context: item.image.contextLink
        }
      });
      return res.send(data);
    }
  );
});

router.get('/latest', (req, res) => {
  searchRecord.getLatest().then((data) => {
    const latest = data.map((d) => {
      return {
        term: d.searchTerm,
        time: new Date(parseInt(d.timeStamp))
      }
    });
    res.send(latest);
  })
});

module.exports = router;
