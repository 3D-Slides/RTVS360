var React = require('react');
var ChatBox = require('./chatComponent.js');
var VideoBox = require('./videoComponent.js');
var Modal = require('./modalComponents/modalComponent');

var MainRoom = React.createClass({
	render: function() {
		return (
			<div>
				<ChatBox />
				<VideoBox />
				<Modal />
			</div>
		)
	}
})

module.exports = MainRoom;