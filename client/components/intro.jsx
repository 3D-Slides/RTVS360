var React = require('react');
var ReactDOM = require('react-dom');

var Intro = React.createClass({
  render: function() {
    return (

      {/* Intro */}
      <div id="intro-wrapper" className="wrapper style1">
        <div className="title">Introduction</div>
        <section id="intro" className="container">
          <p className="style1">So in case you were wondering what this is all about ...</p>
          <p className="style2">
            3D-SLIDES is a free application which allows you to<br className="mobile-hide" />
            present your HTML and or Markup slides in a  <a href className="nobr">3D Universe.</a>
          </p>
          <p className="style3">It's <strong>simple</strong>, built on <strong>THREE.JS</strong> and <strong>Web GL</strong>, and released for
            free under the <a href>The MIT License (MIT)</a>, so use it for any of
            your personal or commercial projects – just be sure to credit us!</p>
          <ul className="actions">
            <li><a href="#" className="button style3 big">Get Started</a></li>
          </ul>
        </section>
      </div>

    );
  }
});

module.exports = Intro;
