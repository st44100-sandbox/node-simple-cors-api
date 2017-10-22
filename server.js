var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

require('date-utils');

var app = express();
app.use(cookieParser());

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
app.get('/', function(req, res) {
  res.render('index');
});
app.use('/api/v1', api);

// Start server.
app.listen(3001, function() {
  console.log('Open: http://localhost:3001')
});

