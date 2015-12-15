var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var request = require('request');
var Header = require('./components/header.jsx');
var SideNav = require('./components/side-nav.jsx');
var CodeEditor = require('./components/codeEditor.jsx');
var Footer = require('./components/footer.jsx');


var SlidesCreator = React.createClass({


	postSubmit: function (event) {
		event.preventDefault();
		var markdownText = document.getElementById('markdownInput').value;
		var markString = JSON.stringify(markdownText);

		request({
			url: 'http://localhost:3131/presentation',
			method: 'POST',
			headers: {
				'Content-Type': 'text/html',
				'data': JSON.stringify(markdownText)
			}
		}, function (error,response,body) {
			if(error) {
				console.log(error);
			} else {
				console.log(response.statusCode, response.headers);
			}
		})

		document.cookie = `${markString}`;
		window.location.href = 'http://localhost:3131/presentation';
	},

	render: function() {
	return (
	  <div className="main-content">

	  		{/* BEGIN HEADER */}
        <Header/>

					{ /*<!-- BEGIN PAGE CONTENT -->*/ }
	        <div className="page-content page-editors">

          <SideNav/>
					<CodeEditor postSub={this.postSubmit}/>
					<Footer />

        	</div>
    </div>
    )
  }
});

ReactDOM.render(<SlidesCreator/>, document.getElementById('appContainer'));
