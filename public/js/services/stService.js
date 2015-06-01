var app = angular.module('RobotReview');



app.service('stService', function($http, $q){
 var stocks = [];

	var deferred = $q.defer();
	
this.getStock = function(){
	
	$http.get('https://www.quandl.com/api/v1/datasets/WIKI/AAPL.csv?auth_token=AmnikopZ2G-QXfdX3woi')
 
	.success(function(data){
	

		var lines=data.split("\n");

		var result = [];

		var headers=lines[0].split(",");

		for(var i = 1; i < lines.length; i++){

			var obj = {};
			var currentline=lines[i].split(",");

			for(var j = 0; j < headers.length; j++){
				obj[headers[j]] = currentline[j];
			}
			result.push(obj);
		}
		for(var i in result){
			stocks.push({
				Date: result[i].Date,
				High: result[i].High,
				Low: result[i].Low,
				Close: result[i].Close,
				Volume: result[i].Volume


			})

		}
		result = stocks;
		deferred.resolve(stocks)



	})
	return deferred.promise;	
}

})

	    
	    	
  