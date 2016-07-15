var glasseye = angular.module('glasseye', []);

function mainController($scope, $http) {
var globalData = [];
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
}
