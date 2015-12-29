var React = require('react');
var ReactDOM = require('react-dom');

var Info = React.createClass({
  render: function() {
    return (
      <div>
        <div id="howitworks" className="title">Instructions</div>
        <div id="highlights" className="container">
          <div className="row 150%">
            <div className="4u 12u(mobile)">
              <section className="highlight">
                <a href="#" className="image featured"><img src="assets/images/instructions1.png" /></a>
                <h3>Click on Get Started</h3>
                <p>This will take you to the slides generator where you can enter your markdown that you would like to turn into slides.</p>

              </section>
            </div>
            <div className="4u 12u(mobile)">
              <section className="highlight">
                <a href="#" className="image featured"><img src="assets/images/instructions2.png" /></a>
                <h3>Click Create Slides</h3>
                <p>After you have entered all of your markdown, (you may review it on the right hand side of the editor) press Create Slides.</p>

              </section>
            </div>
            <div className="4u 12u(mobile)">
              <section className="highlight">
                <a href="#" className="image featured"><img src="assets/images/instructions3.png"  /></a>
                <h3>3D Universe Interaction</h3>
                <p>Now since you are in the 3D generated universe, use the right and left arrows to navigate. The first time, press right!</p>

              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Info;
