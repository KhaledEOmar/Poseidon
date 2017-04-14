// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var Workout = new Schema({
	username: String,
	date: {type: Date, default: Date.now},
	workouts:[
		{
			weightTraining:[
				{
					workout:String,
					intensity:Number,
					reps:Number
				}
			],
			cardioTraining:[
				{
					workout:String,
					intensity:Number,
					time:Number
				}
			]
		}
	]
});

Workout.plugin(passportLocalMongoose);


module.exports = mongoose.model('workouts', Workout);

