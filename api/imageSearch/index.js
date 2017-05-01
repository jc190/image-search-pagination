const express = require('express');
const router = express.Router();
const config = require('../../config/api');

router.get('/', (req, res) => {
  if (req.query.term) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      "hello": "world"
    });
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  res.send({
    "error": "No search term"
  });
});

module.exports = router;
