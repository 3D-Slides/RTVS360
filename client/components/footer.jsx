var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var Footer = React.createClass({
  render: function() {
    return (

      <div className="footer">
        <div className="copyright">
          <p className="pull-left sm-pull-reset">
            <span>Copyright <span className="copyright">©</span> 2015 </span>
            <span>3D SLIDES INC</span>.
            <span>All rights reserved. </span>
          </p>
          <p className="pull-right sm-pull-reset">
            <span><a href="#" className="m-r-10">Support</a> | <a href="#" className="m-l-10 m-r-10">Terms of use</a> | <a href="#" className="m-l-10">Privacy Policy</a></span>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
