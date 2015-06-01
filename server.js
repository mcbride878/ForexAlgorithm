var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var Review = require('./models/Review');
var User = require('./models/User');


mongoose.connect('mongodb://localhost/ForexRobots');


var app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.post('/api/users', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, new_user) {
		if (err) {
			console.log("can't create user", err);
		}
		res.json(new_user);
	});
});

app.post('/api/users/:userId/Reviews', function(req, res) {
	//grab the review
	Review.findOne({ _id: req.body._id }).exec().then(function(review) {
		if (!review) {
			return res.status(404).end();
		}
		//update the user with the favorite_review
		User.findOne({ _id: req.params.userId }).exec().then(function(user) {
			user.Reviews.push(review);
			user.save(function(err) {
				if (err) {
					console.log("can't add review to user");
				}
				return res.json(user);
			});
		});
	});
});

app.get('/api/users', function(req, res) {
	User
	.find()
	.populate('Reviews')
	.exec().then(function(users) {
		return res.json(users);
	});
});

app.delete('/api/users/:userId', function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete user", err);
		}
		res.status(200).end();
	});
});

app.post('/api/reviews', function(req, res) {
	var review = new Review(req.body);
	review.save(function(err, new_review) {
		if (err) {
			console.log("can't create review", err);
		}
		res.json(new_review);
	});
});

app.get('/api/reviews', function(req, res) {
	Review
	.find()
	// .sort('state')
	.limit(10)
	.skip(req.query.skip || 0)
	.exec().then(function(reviews) {
		return res.json(reviews);
	});
});

app.put('/api/reviews/:reviewId', function(req, res) {
	Review.update(req.body, function(err) {
		if (err) {
			console.log("can't update review", err);
		}
		return res.json(req.body);
	});
});

app.delete('/api/reviews/:reviewId', function(req, res) {
	Review.remove({ _id: req.params.reviewId }, function(err) {
		if (err) {
			console.log("can't delete review", err);
		}
		res.status(200).end();
	});
});

app.listen(8080);