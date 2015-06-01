var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: String,
	Reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]//referenced model
});

module.exports = mongoose.model('User', userSchema);