var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var Header = React.createClass({
  render: function() {
    return (

      {/* Header */}
      <div id="header-wrapper" className="wrapper">
        <div id="header">
          {/* Logo */}
          <div id="logo">
            <h1><a href="#" /><img src="images/logo-LRG.png" alt /></h1>
            <p>Present your HTML and or Markup slides in 3D.</p>
          </div>
          {/* Nav */}
          <nav id="nav">
            <ul>
              <li className="current"><a href="index.html">Home</a></li>
              <li><a href>How it Works</a></li>
              <li><a href="/editor.html">Get Started</a></li>
              <li><a href>Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
});
module.exports = Header;
