var React = require('react');

var VideoBox = React.createClass({

	getInitialState: function() {
		return {
			name: "yo!"
		}
	},

	click: function() {
		this.setState({
			name: "VideoBox!"
		})
	},

	render: function() {
		return (
			<div id="videoContainer">
				<h1 onClick={this.click}>{this.state.name}</h1>
			</div>
		)
	}
});

module.exports = VideoBox;