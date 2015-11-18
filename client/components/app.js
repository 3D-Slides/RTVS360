var React = require('react');
var ChatBox = require('./chatComponent.js');
var VideoBox = require('./videoComponent.js');

var App = React.createClass({

	render: function() {
		return (
			<div>
				<ChatBox />
				<VideoBox />
			</div>
		)
	}
}) 

module.exports = App;