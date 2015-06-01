angular.module('RobotReview')

.controller('reviewsCtrl', function($scope, reviewService, reviews) {
	
	$scope.reviews = reviews;
	$scope.skip_reviews = 0;
	$scope.limit = 5;

	var load = function() {
		reviewService.getReviews($scope.skip_reviews).then(function(reviews) {
			$scope.reviews = reviews;
		});
	};

	$scope.clickAdd = function() {
		reviewService.addReview($scope.newReview).then(function(reviews) {
			$scope.newReview = {};
			$scope.reviews.push(newReview);
		});
	};
});