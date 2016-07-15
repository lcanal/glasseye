var glasseye = angular.module('glasseye', []);

function mainController($scope, $http) {
var globalData = [];
// when landing on the page, get all todos and show them
$http.get('/api/dashboard')
    .success(function(data) {
        $scope.deploys = data;
        console.log(data);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

/* $scope.addRow = function(){
	$scope.deploys.push(({ 'name':$scope.deploys.name, 'employees': $scope.employees, 'headoffice':$scope.headoffice }));
	$scope.deploys[0].name='Ey';
	$scope.employees='';
	$scope.headoffice='';
};
$scope.removeRow = function(name){
		var index = -1;
		var comArr = eval( $scope.companies );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].name === name ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.companies.splice( index, 1 );
};*/
}
