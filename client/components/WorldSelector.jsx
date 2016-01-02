var React = require('react');

var WorldSelector = React.createClass({
	render: function() {
		return (
			<div style={styles} className="input-group worldSelect">
				<label className="radio-inline">
					<input type="radio" name="optradio"/>
						<span style={text}>Tron Grid</span>
				</label>
				<label className="radio-inline">
					<input type="radio" name="optradio"/>
						<span style={text}>Ocean Sunset</span>
				</label>
			</div>
		);
	}
});

var styles = {
	alignSelf: "center",
	margin: '0 auto',
	marginLeft: '40%'
}

var text = {
	fontSize: "16px",
}
module.exports = WorldSelector;