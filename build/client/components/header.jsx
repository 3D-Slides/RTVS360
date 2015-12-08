var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Header = React.createClass({
  render: function() {
    return (
      <div>
        {/* start: header */}

  			<header className="header">
  				<div className="logo-container">
  					<a href="../" className="logo">
  						<img src="assets/images/logo.png" height="35"/>
  					</a>
  					<div className="visible-xs toggle-sidebar-left" data-toggle-className="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
  						<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
  					</div>
  				</div>
  			</header>

  			{/* end: header */}
      </div>
    );
  }
});

module.exports = Header;
