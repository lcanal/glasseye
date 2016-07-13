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
    var deploymentProjects = JSON.parse(body);
    var drawData = [];
    //Table headers:
    //project-name,last deployed dev,last deployed qa,last deployed uat, last deployed prep, last deployed prod
    for (var index in deploymentProjects) {
      //console.log(deploymentProjects[index]['deploymentProject']['name']);
      var data = [{
        'name' : deploymentProjects[index]['deploymentProject']['name'],
        /*for(var environment in deploymentProjects[index]['environmentStatuses']){

        }*/
        'env'          : deploymentProjects[index]['environmentStatuses'][0]['environment']['name'],
        'date'      : deploymentProjects[index]['environmentStatuses'][0]['deploymentResult']['finishedDate'],
        'result'   : deploymentProjects[index]['environmentStatuses'][0]['deploymentResult']['deploymentState']
      }]

      drawData = drawData.concat(data)
    }

    res.render('index', { title: 'TossDash - Bamboo Deploy Dashboard', data: drawData});
  })

});


app.listen(8080, function () {
  console.log('TossDash listening on port 8080!');
});
