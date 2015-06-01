var app = angular.module('RobotReview', ['ngRoute', 'ngGrid']);

app.config(function($routeProvider) {
	$routeProvider.when('/reviews', {
		templateUrl: '/reviews.html',
		controller: 'reviewsCtrl',
		resolve: {
			reviews: function(reviewService) {
				return reviewService.getReviews();
			}
		}
	}).otherwise({
		redirectTo: '/reviews'
	});
});