var glasseye = angular.module('glasseye', ['ngSanitize']);
var refreshPeriodMins = 5;

glasseye.controller("mainController",["$scope", "$http", "$interval", function ($scope, $http, $interval){
    var dataGrabber = function(){
      var lastUpdated = timeConverter(new Date());

      // when landing on the page, get all todos and show them
      $http.get('/api/dashboard')
            .success(function(data) {
              if (data.length <= 0){
                $scope.deploys = [{
                  "date" : "Server returned no results."
                }]
              }
              else {
                $scope.deploys = data;
              }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

     $scope.displayMsg = "Last updated: " + lastUpdated;
   };

   //Display results initially
   dataGrabber();

   $interval(dataGrabber, 1000 * 60 * refreshPeriodMins);

}]);


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
