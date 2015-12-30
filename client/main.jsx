var React = require('react');
var ReactDOM = require('react-dom');
// var Header = require('./components/header.jsx');
// var SideNav = require('./components/side-nav.jsx');
var CodeEditor = require('./components/codeEditor.jsx');
// var Footer = require('./components/footer.jsx');



var SlidesCreator = React.createClass({
	getInitialState: function() {
		return {
			theme: null
		}
	},

	updateTheme: function (e) {
		e.preventDefault();
		var theme = e.currentTarget.innerText
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
				h1: "#FA2C5C",
				h2: "#7FD7ED",
				h3: "#7FD7ED",
				h4: "#7FD7ED",
				p: "#F8A7CC",
				li: "#F8A7CC"
			}
		}

		this.setState({
			theme: theme,
			colorScheme: colorScheme[theme]
		});

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
		var worldInfo = "Tron Grid";
		for (var i = 0; i < worlds.length; i++) {
			if (worlds[i].checked) {
				var worldInfo = worlds[i].parentNode.innerText
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
