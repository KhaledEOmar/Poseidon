'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./app/models/User');


var port = process.env.PORT || 8080;        // set our port


var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(){
	//we're connected
});



// ROUTES FOR OUR API
// =============================================================================
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var user = new User();		// create a new instance of the Bear model
		user.name = req.body.name;  // set the bears name (comes from the request)

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			//res.json(users);
			res.json({ message: 'hooray! welcome to our api!' });
		});
	});
	
	
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name;
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.bear_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);



// SERVE STATIC FILES -------------------------------

app.use(express.static('public'));

app.get('/', function(req, res) {
   res.sendfile('./public/index.html');
});



// LISTEN TO PORT -------------------------------

app.listen(port);
console.log('Magic happens on port ' + port);