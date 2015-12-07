var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var Header = require('./components/app.js');
var Landing = require('./components/landingComponents/landing');
var MainRoom = require('./components/mainRoomComponent');

module.exports = [
	<Router>
		<Route path="/" component={Header}>
			// This route shows up first
			<IndexRoute component={Landing} />
			// on submit/button click, this route shows up
			<Route path="main" component={MainRoom} />

		</Route>
	</Router>
]
