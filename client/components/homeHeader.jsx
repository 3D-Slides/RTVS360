var React = require('react');
var ReactDOM = require('react-dom');

var Header = React.createClass({
  render: function() {
    return (


      <div id="header-wrapper" className="wrapper">
        <div id="header">
          {/* Logo */}
          <div id="logo">
            <h1><a href="#" /><img src="assets/images/logo-LRG.png" /></h1>
            <p>Present your HTML and or Markup slides in 3D.</p>
          </div>

          <ul className="actions actions-centered">
            <li><a href="/create" className="button style1 big">Get Started</a></li>
            <li><a href="#intro-wrapper" className="button style2 big">More Info</a></li>
          </ul>
          {/* Nav */}
          <nav id="nav">
            <ul>
              <li className="current"><a href="#intro-wrapper">Introduction</a></li>
              <li><a href="#howitworks">How it Works</a></li>
              <li><a href="#details">Current Features</a></li>
              <li><a href="#foot">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
});
module.exports = Header;
