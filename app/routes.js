var User = require('./models/user');

module.exports = function(app) {

	

// SERVE STATIC FILES -------------------------------

	app.get('/', function(req, res) {
	   res.sendfile('./public/index.html');
	});	
	
};