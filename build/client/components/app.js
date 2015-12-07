var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;


var Header = React.createClass({
  render: function() {
    return (

      {/* start: header */}
      <header className="header">
        <div className="logo-container">
          <a href="../" className="logo">
            <img src="assets/images/logo.png" height={35} />
          </a>
          <div className="visible-xs toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
            <i className="fa fa-bars" aria-label="Toggle sidebar" />
          </div>
        </div>
      </header>
      {/* end: header */}
    );
  }
});
module.exports = Header;
