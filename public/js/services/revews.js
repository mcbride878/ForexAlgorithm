angular.module('RobotReview')

.service('reviewService', function($http, $q) {

	this.getReviews = function(skip) {
		var deferred = $q.defer();

		var url = '/api/reviews';

		if (!skip) {
			skip = 0;
		}
		url += '?skip='+skip;

		$http({
			method: 'GET',
			url: '/api/reviews',
			data: review
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};

	this.addReview = function(review) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/reviews',
			data: review
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
});