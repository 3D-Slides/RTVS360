var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var App = require('./components/app.js');
var Landing = require('./components/landingComponents/landing');
var MainRoom = require('./components/mainRoomComponent');

var createHistory = require('history').createHistory



module.exports = [
	<Router>
		<Route path="/" component={App}>
			// This route shows up first
			<IndexRoute history={createHistory()} component={Landing} />
			// on submit/button click, this route shows up
			<Route path="/main" component={MainRoom} />
			// <Route path="/main" component={MainRoom} />

		</Route>
	</Router>
]