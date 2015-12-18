var React = require('react');
var ReactDOM = require('react-dom');

var Main = React.createClass({
  render: function() {
    return (

      {/* Main */}
      <div>


        <div className="title">Details</div>
        <div id="main" className="container">
          {/* Image */}
          {/* <a href="#" class="image featured">
								<img src="images/pic01.jpg" alt="" />
							</a> */}
          {/* Features */}
          <section id="features">
            <header className="style1">
              <h2>This is a list of the current features...</h2>
              <p>Don't worry, we're constantly working on improvements and additions.</p>
            </header>
            <div className="feature-list">
              <div className="row">
                <div className="6u 12u(mobile)">
                  <section>
                    <h3 className="icon fa-font">Convert Markdown to 3D Slides</h3>
                    <p>Simply enter your markdown into the editor, look to the right to preview your slide and once you're finished click save.</p>
                  </section>
                </div>
                <div className="6u 12u(mobile)">
                  <section>
                    <h3 className="icon fa-html5">Convert HTML to Slide Presentations</h3>
                    <p>Simply enter your HTML into the editor, look to the right to preview your slide and once you're finished click save.</p>
                  </section>
                </div>
              </div>
              <div className="row">
                <div className="6u 12u(mobile)">
                  <section>
                    <h3 className="icon fa-picture-o">Add images to your slides</h3>
                    <p>Simply enter your markdown into the editor, look to the right to preview your slide and once you're finished click save.</p>
                  </section>
                </div>
                <div className="6u 12u(mobile)">
                  <section>
                    <h3 className="icon fa-exchange">Select Multiple Transitions</h3>
                    <p>Determine which transitions you want to add to not only your text, but also your images and backgrounds.</p>
                  </section>
                </div>
              </div>
              <div className="row">
                <div className="6u 12u(mobile)">
                  <section>
                    <h3 className="icon fa-code">Add code into your slides</h3>
                    <p>You can specify if you want to add a code block in the editor and then, take a snapshot of your code and place it in your universe.</p>
                  </section>
                </div>
                <div className="6u 12u(mobile)">
                  <section>
                    <h3 className="icon fa-floppy-o">Save your slides</h3>
                    <p>Don't stress. You can save your progress at any time and come back later. You can also save your whole presentation and present again and again.</p>
                  </section>
                </div>
              </div>
            </div>
            <ul className="actions actions-centered">
              <li><a href="#" className="button style1 big">Get Started</a></li>
              <li><a href="#" className="button style2 big">More Info</a></li>
            </ul>
          </section>
        </div>

      </div>
    );
  }
});

module.exports = Main;
