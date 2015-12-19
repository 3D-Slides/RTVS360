var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3131;

app.use(bodyParser.text({ type: 'text/html' }));

app.use(cors());

// app.use(function(req,res,next){
// 	res.header("Access-Controll-Allow-Origin", "*");
// 	res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// })

app.use(express.static(path.join(__dirname + './../')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + './index.html'));
});

app.get('*', function(req, res) {
	res.header("Access-Controll-Allow-Origin", "*");
	res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.get('/home', function(req, res) {
	res.sendFile(path.join(__dirname + './../home.html'));
});

app.get('/presentation', function(req, res) {
	res.sendFile(path.join(__dirname +'./../presentation.html'));
});

app.post('/presentation', function(req, res) {
	res.send();
});

app.listen(port, function(){
	console.log("Yo fool! The server is connected on port 3131! ...");
});
