var app = angular.module('RobotReview');

app.controller('mainCtrl', function($scope, stService){

	

	$scope.gridOptions = {
		data: 'stockData',
		height: '120px',
		showFilter: true,
		showColumnMenu: true,
		sortInfo: {fields: ['Date', 'High', 'Low', 'Volume', 'Close'], directions: ['asc']},
		columnDefs: [
		   {field: 'Date', displayName: 'Date'},
		   {field: 'High', displayName: 'High'},
		   {field: 'Low', displayName: 'Low'},
		   {field: 'Volume', displayName: 'Volume'},
		   {field: 'Close', displayName: 'Close'}
		]
	};


	// $scope.gridOptions = {
	// 	data: 'testData'
	// }

	// $scope.testData = [	{Date: '12/01/2020'},
	// 					{Date: '12/01/2020'},
	// 					{Date: '12/01/2020'},
	// 					{Date: '12/01/2020'},
	// 					{Date: '12/01/2020'}
	// 					]

	$scope.getStockData = function(dateQuery){
	
		stService.getStock($scope.dateQuery).then(function(data){
			console.log(data);
			$scope.stockData = data;










		});
	}
	
})