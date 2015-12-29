var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var compress = require('compression');

var app = express();

var port = process.env.PORT || 3131;

app.use(compress());
app.use(bodyParser.text({ type: 'text/html' }));
app.use(cors({origin: 'http://three-d-slides.herokuapp.com'}));


app.use(express.static(path.join(__dirname + './../')));

app.get('/create', function(req, res) {
	res.sendFile(path.join(__dirname + './../create.html'));
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + './index.html'))
})

app.get('/presentation', function(req, res) {
	res.sendFile(path.join(__dirname +'./../presentation.html'));
});

app.post('/presentation', function(req, res) {
	res.send();
});

app.listen(port, function(){
	console.log("Server is connected on port 3131! ...");
});
