var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header.jsx');
var SideNav = require('./components/side-nav.jsx');
var CodeEditor = require('./components/codeEditor.jsx');
var Footer = require('./components/footer.jsx');



var SlidesCreator = React.createClass({


	postSubmit: function (event) {
		event.preventDefault();

		var markdownText = document.getElementById('code-input-box').value;
		var markString = JSON.stringify(markdownText);

		var now = new Date(),
		    time = now.getTime(),
		    expireTime = now + 10000;
		now.setTime(expireTime);


		document.cookie = `${markString}`+ ';max-age=1';
		window.localStorage.setItem('input', markdownText);
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
