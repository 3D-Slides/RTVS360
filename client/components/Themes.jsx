var React = require('react');

var Themes = React.createClass({
	render: function () {
		var colorTheme = this.props.theme || "Select a color scheme";
		return (
			<div className="dropdown col-xs-3">
				<button
					className="btn btn-default btn-square dropdown-toggle"
					type="button"
					id="dropdownMenu1"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="true"
					style={styles.drop}>
						{colorTheme}
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu dropdown-menu-left"
					aria-labelledby="dropdownMenu1"
					style={styles.a}>
					<li onClick={this.props.updateTheme}><a>Tron Blue</a></li>
					<li onClick={this.props.updateTheme}><a>Neon Lights</a></li>
					<li onClick={this.props.updateTheme}><a>Hello Kitty</a></li>
				</ul>
			</div>
		)
	}
});

var styles = {
	a: {
		width: "200px",
		marginLeft: "22px",
		textAlign: "center"
	},

	drop: {
		height: "45px",
		marginLeft: "7px",
		width: "200px"
	}
};
module.exports = Themes;