var express = require('express');
var cors = require('cors');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');

var ReactDOMServer = require('react-dom/server');

var app = express();

app.use(bodyParser.text({ type: 'text/html' }));

app.use(cors());

app.use(express.static(path.join(__dirname + './../')))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + './index.html'))
})

app.get('/presentation', function(req, res) {
	res.sendFile(path.join(__dirname +'./../presentation.html'));
})

app.post('/presentation', function(req, res) {
	res.send();
})

app.listen(process.env.PORT || 3131, function(){
	console.log("Yo fool! The server is connected on port 3131! ...");
});
