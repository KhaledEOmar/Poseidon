'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(){
	//we're connected
});


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);