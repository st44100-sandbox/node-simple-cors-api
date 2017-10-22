var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Routing.
router.get('/me', function(req, res) {
  const responseBody = {
    foo: 'bar'
  };

  console.log('Cookies: ', req.cookies)
  res.cookie('PLAY_SESSION', 'my-session-cookie-' + (new Date()).toFormat('YYYY-MM-DD-HH24-MI-SS'));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(responseBody));
});

module.exports = router;
