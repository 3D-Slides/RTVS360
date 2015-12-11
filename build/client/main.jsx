var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var request = require('request');
var Header = require('./components/header.jsx');
var SideNav = require('./components/side-nav.jsx');
var MarkDown = require('./components/markDownEditor.jsx');
var CodeEditor = require('./components/codeEditor.jsx');
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
	  <section className="body">

	  {/* start: header */}
        <Header/>

        <div className="inner-wrapper">

          <SideNav/>
          <MarkDown postSub={this.postSubmit}/>
					<CodeEditor />

        </div>
      </section>
    )
  }
});

ReactDOM.render(<SlidesCreator/>, document.getElementById('appContainer'));
