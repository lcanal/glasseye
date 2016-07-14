var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res){

  var settings = require(__base + 'settings.json');

  if (!settings['url'].length) {
      var error = "Error: blank URL in settings.json file."
      console.log(error);
      res.send(error);
      return;
  }

  var options = {
    "url" : settings['url'] + "rest/api/latest/deploy/dashboard.json",
    "auth":  settings['auth']
  }

  request(options,function(error,response,body){
    var deploymentProjects = JSON.parse(body);
    var drawData = [];
    //Table headers:
    //project-name,last deployed dev,last deployed qa,last deployed uat, last deployed prep, last deployed prod
    for (var index in deploymentProjects) {
      for (var env in deploymentProjects[index]['environmentStatuses']){
        //Check for never deployed environments.
        if (deploymentProjects[index]['environmentStatuses'][env].hasOwnProperty('deploymentResult')){
          var unixDate = deploymentProjects[index]['environmentStatuses'][env]['deploymentResult']['finishedDate'];
          var deployState = deploymentProjects[index]['environmentStatuses'][env]['deploymentResult']['deploymentState'];
          var deploySummary = deploymentProjects[index]['environmentStatuses'][env]['deploymentResult']['reasonSummary'];
          var deployVersion = deploymentProjects[index]['environmentStatuses'][env]['deploymentResult']['deploymentVersion']['name'];
          var deployVersionID = deploymentProjects[index]['environmentStatuses'][env]['deploymentResult']['deploymentVersion']['id'];

          deployDate = new Date(unixDate);
        }
        else{
          var deployDate = new Date("July 28, 2008 15:00:00")
          var deployState = "N/A"
          var deploySummary = "N/A"
          var deployVersion = "N/A"
        }

        //Construct data for table
        var data = [{
          'name'        : deploymentProjects[index]['deploymentProject']['name'],
          'env'         : deploymentProjects[index]['environmentStatuses'][env]['environment']['name'],
          'date'        : deployDate,
          'result'      : deployState,
          'version'     : deployVersion,
          'versionurl'  : settings['url'] + "deploy/viewDeploymentVersion.action?versionId=" + deployVersionID,
          'summary'     : deploySummary
        }]
      }

      drawData = drawData.concat(data);
    }

    var sortedDeploys = sortDeployData(drawData);

    res.render('index', { title: 'Glasseye - Bamboo Deploy Dashboard', data: sortedDeploys});
  })

});

function sortDeployData(data){
  var newData = [];
  data.sort(function(a,b){
    return b.date - a.date;
  })

  //Bundle the formatting of the date string since we're running through the whole
  //array anyway
  for (var index=0; index < data.length ; index++ ){
    data[index]['date'] = timeConverter(data[index]['date']);
    newData = newData.concat(data[index]);
  }
  return newData;
};

function timeConverter(UnformattedDate){
  var a = UnformattedDate;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = UnformattedDate.getFullYear();
  var month = months[UnformattedDate.getMonth()];
  var date = UnformattedDate.getDate();
  var hour = UnformattedDate.getHours();
  var min = "0" + UnformattedDate.getMinutes();
  var sec = "0" + UnformattedDate.getSeconds();
  var time = date + '-' + month + '-' + year + ' ' + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
  return time;
}


module.exports = router;
