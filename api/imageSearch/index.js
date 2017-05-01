const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config/api');

router.get('/', (req, res) => {
  // Set header for json
  res.setHeader('Content-Type', 'application/json');
  if (!req.query.term) {
    return res.send({
      "error": "No search term provided."
    })
  }
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

module.exports = router;
