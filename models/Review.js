var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    profit: String,
	Loss: String,
	Time: String,
//was state
	Advice: String,
	Overall: String
});

module.exports = mongoose.model('Review', reviewSchema);