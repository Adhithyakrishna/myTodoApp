var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	task: {
		type: String,
		index:true
	},
	taskDescription:
	{
		type: String,
	},
	isCompleted: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	isReopened: {
		type: Boolean,
		default: false
	},
	caseEndDetails:{
		type: String
	},
	createdAt:
	{
		type:String,
		default: Date.now
	},
	updatedAt:
	{
		type:String
	}
}
);




var User = module.exports = mongoose.model('User', UserSchema);


module.exports.listTask = function(callback){

	var query = { $and: [{isCompleted: {$ne: true}}, {isDeleted: {$ne: true}}] };
	console.log(query);
	User.find(query,callback);
}


module.exports.listCompletedTask = function(callback){

	var query = {isCompleted: true};
	console.log(query);
	User.find(query,callback);
}

module.exports.listRemovedTask = function(callback){

	var query = {isDeleted: true};
	console.log(query);
	User.find(query,callback);
}

// module.exports.findTasksByDate = function(callback){

// }