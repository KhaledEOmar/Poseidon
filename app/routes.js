var User = require('./models/user');

module.exports = function(app) {

//AUTHENTICATION, AUTHORIZATION, AND REGISTRATION---------

	app.get('/api/authenticate', function(req,res){

	});
	
	app.post('/api/register', function(req,res){
		
	});
	
	

	
// SERVE STATIC FILES -------------------------------

	app.get('/', function(req, res) {
	   res.sendfile('./public/index.html');
	});	
	
};