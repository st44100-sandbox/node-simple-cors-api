var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cors = require('cors');

require('date-utils');

var app = express();
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3002',
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}));

// Application Modules
var api = require('./modules/api/index');

// Routing
app.use('/api/v1', api);

// GET
app.get('/v1/login', function(req, res) {
  const responseBody = {
    foo: 'bar: get'
  };

  console.log('Cookies: ', req.cookies)
  res.cookie('PLAY_SESSION', 'my-session-cookie-' + (new Date()).toFormat('YYYY-MM-DD-HH24-MI-SS'));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(responseBody));
});

// POST
app.post('/v1/login', function(req, res) {
  const responseBody = {
    foo: 'bar post'
  };

  console.log('Cookies: ', req.cookies)
  res.cookie('PLAY_SESSION', 'my-session-cookie-' + (new Date()).toFormat('YYYY-MM-DD-HH24-MI-SS'));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(responseBody));
});

// Default
app.get('/', function(req, res) {
  res.render('index');
});

// Start server.
app.listen(3001, function() {
  console.log('Open: http://localhost:3001')
});

