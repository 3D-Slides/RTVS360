var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var createHistory = require('history').createHistory

// grab our routes from the routes.js folder
var routes = require('./routes');

// history.go(0);

// render to DOM with the imported routes (this is the react router v1.0 way, different from old react router)
ReactDOM.render(<Router history={createHistory()}>{routes}</Router>, document.getElementById('appContainer'));

	

