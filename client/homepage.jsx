var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/homeHeader.jsx');
var Intro = require('./components/intro.jsx');
var Main = require('./components/mainContent.jsx');
var Footer = require('./components/homeFooter.jsx');
var Info = require('./components/info.jsx');


var LandingPage = React.createClass({

	render: function() {
	return (
	  <div>



	  		{/* BEGIN HEADER */}
        <Header/>

        	<Intro />

						<div className="wrapper style3">

						<Info/>

						</div>

						{ /*<!-- BEGIN PAGE CONTENT -->*/ }
		        <div id="main" className="wrapper style2">
	          	<Main/>

	        	</div>


					<Footer />
    </div>
    )
  }
});

ReactDOM.render(<LandingPage/>, document.getElementById('homeContainer'));
