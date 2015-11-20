var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var MainRoom = require('./mainRoomComponent');
var Landing = require('./landingComponents/landing');
var Modal = require('./modalComponents/modalComponent');


var App = React.createClass({

	getInitialState: function() {
		return {

			/* 
			* store the video url in the App state for use in the VideoBox component in MainRoom. 
			* pass down through App's render function
			*/
			videoUrl: null,
			// store unique room id for room url *****(do we need this here?)*****
			uniqueRoomId: null

		}
	},

	// function to create unique room and take user to that room on submit
	createRoom: function(e) {

		/* To Do:
		* grab url,
		* generate room,
		* switch route to new room (main + new url)
		*/

		console.log('hey!');
		// e.preventDefault();
	},

	render: function() {
		return (
			<div>
				{/* renders a child depending on the path, then passes App's props to that child. */}
				{this.props.children && React.cloneElement(this.props.children, {
						createRoom: this.createRoom
					})
				}
			</div>
		)
	}
}) 

module.exports = App;