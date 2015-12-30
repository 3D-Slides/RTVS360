var React = require('react');

var WorldSelector = React.createClass({
	render: function() {
		return (
			<div style={styles} className="input-group col-xs-3 col-xs-offset-2">
				<label className="radio-inline">
					<input type="radio" name="optradio"/>
						<span style={styles}>Tron Grid</span>
				</label>
				<label className="radio-inline">
					<input type="radio" name="optradio"/>
						<span>Ocean Sunset</span>
				</label>
			</div>
		);
	}
});

var styles = {
	fontSize: "16px",
	alignSelf: "center",
}
module.exports = WorldSelector;