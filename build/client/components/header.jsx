var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var Header = React.createClass({
  render: function() {
    return (
      <div>
        {/* start: header */}

  			<header className="header">
  				<div className="logo-container">
  					<a href="../" className="logo">
  						<img src="build/assets/images/logo.png" height="55"/>
  					</a>
  					<div className="visible-xs toggle-sidebar-left" data-toggle-className="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
  						<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
  					</div>
  				</div>

          { /*<div className="container-fluid">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">HOME</a></li>

            <li><a href="#">ABOUT</a></li>

            <li><a href="#">CREATE SLIDES</a></li>
          </ul>
        </div> */}
  			</header>

  			{/* end: header */}
      </div>
    );
  }
});

module.exports = Header;
