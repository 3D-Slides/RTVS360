var React = require('react');
var Invite = require('./inviteComponent');
var UniqueLink = require('./linkComponent');

var Modal = React.createClass({
	render: function() {
		return(
			<div id="modalContainer">
				<UniqueLink />
				<Invite />
			</div>
		)
	}
});

module.exports = Modal;