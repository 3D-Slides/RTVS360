var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var Footer = React.createClass({
  render: function() {
    return (
      <div>

      <section  id="foot-landing">

      <div id="footer-wrapper" className="wrapper">

        <div id="foot" className="title"><a className="scroll" href="#foot-landing">All of the Other Stuff</a></div>
        <div id="footer" className="container">
          <header className="style1">
            <h2>Not convinced yet?</h2>
            <p>
              Have no fear, 3D-Slides is here. Just try it out and have a play around.<br />
              We promise, you won't regret it!!!
            </p>
          </header>
          <hr />

            <div id="main" className="container ">

              <section id="features">

                <div className="feature-list">
                  <div className="row">
                    <div className="6u 12u(mobile)">
                      <section>
                        <h3 className="icon fa-github-alt">GitHub Repo</h3>
                        <p><a href="https://github.com/3D-Slides/RTVS360">Fork Me... </a>Head on over to the GitHub Repo and look around. Please make sure to star and fork it if you like the application. </p>
                      </section>
                    </div>
                    <div className="6u 12u(mobile)">
                      <section>
                        <h3 className="icon fa-envelope">Email</h3>
                        <p><a mailto:info@3dslides.io>Contact Us... </a>If you have any questions or concerns shoot us an email, or submit an issue on the GitHub Repo. Thanks for stopping by!</p>
                      </section>
                    </div>
                  </div>



                </div>

              </section>
            </div>




            {/* Contact Form */}
            {/* <<div className="6u 12u(mobile)">



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


            </div>*/}


            <div className="6u 12u(mobile)">
              {/* Contact */}
              <div className="feature-list">
                { /* <div className="row">
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
                        <a href="info@3dslides.com">Email</a><br />
                        <a href="https://github.com/3D-Slides/RTVS360">Github Repo</a><br />
                        <a href="#">facebook.com/yadayada</a>
                      </p>
                    </section>
                  </div>
                </div> */}


                {/*<div className="row">
                  <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-github-alt">Github Repo</h3>
                      <p>
                        <a href="https://github.com/3D-Slides/RTVS360">Fork Me </a>
                      </p>
                    </section>

                  </div>

                  <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-envelope">Email</h3>
                      <p>
                        <a href="#">Contact Us</a>
                      </p>
                    </section>
                  </div>
                  {/* <div className="6u 12u(mobile)">
                    <section>
                      <h3 className="icon fa-phone">Phone</h3>
                      <p>
                        (000) 555-0000
                      </p>
                    </section>
                  </div> */}
                {/*</div>
                */}


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
      </section>
    </div>

    );
  }
});

module.exports = Footer;
