var React = require('react');
var Input = require('./landingInput');

var Landing = React.createClass({

	render: function() {
		return (
			<div id='landingContainer'>

				<div>
					<h2>Get Started by Entering the Youtube url below!</h2>
				</div>

				<div>
					<Input createRoom={this.props.createRoom} />
				</div>
				
			</div>
		)
	}
}) 

module.exports = Landing;