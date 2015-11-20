var express = require('express');
var path = require('path');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var history = require('history').createBrowserHistory

var ReactDOMServer = require('react-dom/server');

// var routes = require('../client/routes');


var app = express();

app.use(express.static(path.join(__dirname + './../')))
// var routes = require('../client/routes');

// app.use(function(req, res) {
//   Router.run(routes, req.path, function(Handler) {
//     res.send('<!DOCTYPE html>' + React.renderToString(<Handler path={req.path} />));
//   });
// });

app.use('/', function(req, res) {
	res.sendFile(path.join(__dirname + './../index.html'))
})


app.listen(3100, function(){
	console.log("server is up and runnin' ...");
});