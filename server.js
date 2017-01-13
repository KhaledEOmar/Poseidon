'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./app/models/User');


var port = process.env.PORT || 8080;        // set our port


var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(){
	//we're connected
});


app.use(express.static('public'));

app.get('/api', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log('Magic happens on port ' + port);