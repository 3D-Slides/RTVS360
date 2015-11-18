var React = require('react');

var ChatBox = React.createClass({

	getInitialState: function() {
		return {
			name: 'hey!'
		}
	},

	click: function() {
		this.setState({
			name: 'ChatBox!'
		})
	},
 
	render: function() {
		return (
			<div id="chatBoxContainer">
				<h1 onClick={this.click}>{this.state.name}</h1>
			</div> 
		)
	}
});

module.exports = ChatBox;