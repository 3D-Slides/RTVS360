var React = require('react');
var ReactDOM = require('react-dom');
var CodeEditor = require('./components/codeEditor.jsx');

var SlidesCreator = React.createClass({
	getInitialState: function() {
		return {
			theme: "Tron Blue"
		}
	},
	componentDidMount: function() {
		var _this = this;
		_this.updateTheme();
		$('body').on('render', function() {
			requestAnimationFrame( _this.updateTheme );
		});
	},
	updateTheme: function (e) {
		if (typeof e === "number") e = null;
		if (e) e.preventDefault();
		var theme = e ? e.currentTarget.innerText : this.state.theme;

		var colorScheme = {
			"Tron Blue": {
				h1: "#00d1ff",
				h2: "#ffffff",
				h3: "#ffffff",
				h4: "#00d1ff",
				p: "#B8F2FF",
				li: "#B8F2FF"
			},
			"Neon Lights": {
				h1: "#D4FD12",
				h2: "#22ff00",
				h3: "#22ff00",
				h4: "#22ff00",
				p: "#EB85FF",
				li: "#EB85FF"
			},
			"Hello Kitty": {
				h1: "#FF4FA7",
				h2: "#FF00FF",
				h3: "#FF00FF",
				h4: "#FF00FF",
				p: "#00FFFF",
				li: "#00FFFF"
			}
		}
		if (e) {
			this.setState({
				theme: theme,
				colorScheme: colorScheme[theme]
			});
		}


		var worlds = document.getElementsByTagName('input');
		var worldInfo = "Tron Grid";
		for (var i = 0; i < worlds.length; i++) {
			if (worlds[i].checked) {
				var worldInfo = worlds[i].parentNode.innerText
			}
		}

		$('.uk-htmleditor-preview').css("background", "#1F1E24");
		Object.keys(colorScheme[theme]).forEach(function(tag) {
			$(tag, '.uk-htmleditor-preview')
				.css("color", colorScheme[theme][tag])
				.css("font-family", "Helvetica")
				.css("font-weight", "500");
		});
	},

	postSubmit: function (event) {
		event.preventDefault();
		var markdownText = document.getElementById('code-input-box').value;
		var markString = JSON.stringify(markdownText);

		var defaultColor = {
				h1: "#00d1ff",
				h2: "#ffffff",
				h3: "#ffffff",
				h4: "#00d1ff",
				p: "#B8F2FF",
				li: "#B8F2FF"
			};
		var colorScheme = this.state.colorScheme || defaultColor;

		var worlds = document.getElementsByTagName('input');
		for (var i = 0; i < worlds.length; i++) {
			if (worlds[i].checked) {
				var worldInfo = worlds[i].parentNode.textContent || "Tron Grid";
			}
		}

		var now = new Date(),
		    time = now.getTime(),
		    expireTime = now + 10000;
		now.setTime(expireTime);

		document.cookie = '${markString}' + ';max-age=10';
		window.localStorage.setItem('input', markdownText);
		window.localStorage.setItem('colors', JSON.stringify(colorScheme));
		window.localStorage.setItem('world', worldInfo);
		window.location.href = '/presentation';
	},

	render: function() {
	return (
		<div className="main-content">
		{/* BEGIN HEADER */}
		{/* <Header/> */}
		{ /*<!-- BEGIN PAGE CONTENT -->*/ }
			<div className="page-content page-editors">
			{/* <SideNav/> */}
				<CodeEditor
					postSub={this.postSubmit}
					updateTheme={this.updateTheme}
					theme={this.state.theme}
				/>
			{/* <Footer /> */}
			</div>
		</div>
    )
  }
});

ReactDOM.render(<SlidesCreator/>, document.getElementById('appContainer'));
