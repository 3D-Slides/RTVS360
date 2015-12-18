var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var Footer = React.createClass({
  render: function() {
    return (

      {/* Footer */}
      <div id="footer-wrapper" className="wrapper">
        <div className="title">The Rest Of It</div>
        <div id="footer" className="container">
          <header className="style1">
            <h2>Not convinced yet?</h2>
            <p>
              Have no fear, 3D-Slides is here. Just try it out and have a play around.<br />
              We promise, you won't regret it!!!
            </p>
          </header>
          <hr />
          <div className="row 150%">
            <div className="6u 12u(mobile)">
              {/* Contact Form */}
              <section>
                <form method="post" action="#">
                  <div className="row 50%">
                    <div className="6u 12u(mobile)">
                      <input type="text" name="name" id="contact-name" placeholder="Name" />
                    </div>
                    <div className="6u 12u(mobile)">
                      <input type="text" name="email" id="contact-email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="row 50%">
                    <div className="12u">
                      <textarea name="message" id="contact-message" placeholder="Message" rows={4} defaultValue={""} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="12u">
                      <ul className="actions">
                        <li><input type="submit" className="style1" defaultValue="Send" /></li>
                        <li><input type="reset" className="style2" defaultValue="Reset" /></li>
                      </ul>
                    </div>
                  </div>
                </form>
              </section>
            </div>
            <div className="6u 12u(mobile)">
              {/* Contact */}
              <section className="feature-list small">
                <div className="row">
                  <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-home">Mailing Address</h3>
                      <p>
                        3D SLIDES INC.<br />
                        1234 Somewhere Rd <br />
                        Los Angeles, CA 90064
                      </p>
                    </section>
                  </div>
                  <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-comment">Social</h3>
                      <p>
                        <a href="#">info@3dslides.com</a><br />
                        <a href="#">github.com/yadayada</a><br />
                        <a href="#">facebook.com/yadayada</a>
                      </p>
                    </section>
                  </div>
                </div>
                <div className="row">
                  <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-envelope">Email</h3>
                      <p>
                        <a href="#">info@3dslides.com</a>
                      </p>
                    </section>
                  </div>
                  <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-phone">Phone</h3>
                      <p>
                        (000) 555-0000
                      </p>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <hr />
        </div>
        <div id="copyright">
          <ul>
            <li>© 3D-SLIDES</li><li>Copyright <a href>2015</a></li>
          </ul>
        </div>
      </div>

    );
  }
});

module.exports = Footer;
