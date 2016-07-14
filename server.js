global.__base = __dirname + '/';
var express = require('express');
var request = require('request');
var indexRoute = require('./routes/index.js')
var app = express();

app.use('/static', express.static('static'));
app.use('/', indexRoute);

app.set('view engine', 'ejs');

app.listen(8080, function () {
  console.log('Glasseye listening on port 8080!');
});
