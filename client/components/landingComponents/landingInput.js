var React = require('react');
var Link = require('react-router').Link;

var InputBox = React.createClass({
	
	render: function(props) {
		console.log(this.props.createRoom);
		return (
			<div>
				<form onSubmit={this.props.createRoom}>
					<input type='text' placeholder='paste your youtube URL here...'></input>
					{/*this is a method from react-router that links to the specified route (use instead of 'a' tag)*/}
					<Link to='main' onClick={this.props.createRoom}>Create Room</Link>
				</form>
			</div>
		)
	}

})

module.exports = InputBox;