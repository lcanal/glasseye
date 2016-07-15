global.__base = __dirname + '/';
var express = require('express');
var request = require('request');
var app = express();

var dashboardRoute = require('./api/dashboard')
app.use('/public', express.static('public'));

//Routes
app.use('/api/dashboard', dashboardRoute);

//Listen
app.listen(8080, function () {
  console.log('Glasseye listening on port 8080!');
});


//Public view
app.get('/', function(req, res) {
        res.sendFile(__base + '/public/index.html');
    });
