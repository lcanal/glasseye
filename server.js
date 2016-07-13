var express = require('express');
var request = require('request');
var app = express();


app.use('/static', express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var options = {
    url: "",
    'auth': {
      'user': "",
      'pass': ""
    }
  }
  request(options,function(error,response,body){
    res.render('index', { title: 'TossDash - Bamboo Deploy Dashboard', data: body});
  })

});


app.listen(8080, function () {
  console.log('TossDash listening on port 8080!');
});
