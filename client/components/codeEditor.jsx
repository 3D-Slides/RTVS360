var React = require('react');
var ReactDOM = require('react-dom');
var Themes = require('./Themes.jsx');
var WorldSelector = require('./WorldSelector.jsx');
var MarkdownInstructions = require('./MarkdownInstructions.jsx');

var CodeEditor = React.createClass({
  getLocalStorage: function () {
    if(window.localStorage.input){
      return window.localStorage.input;
    } else {
      return "# Welcome to 3D Slides Beta!\n" +
        "## We currently support markdown and html\n" +
        " When you're ready, delete the text and write your own!\n" +
        "___\n\n" +
        "# Live Updates\n" +
        "Type on the left side\n\n" +
        "And the text appears on the right\n" +
        "___\n\n" +
        "# For markdown tags\n" +
        "* Hover over the ? icon\n" +
        "* or click the tabs to automatically insert markdown prefixes\n" +
        "___\n\n" +
        "# How to make a new slide\n" +
        "use 3 underscores in a row\n" +
        "___\n\n"+
        "# For Images\n" +
        "![]( http://i.imgur.com/TYl9A7z.jpg )\n"+
        "___\n\n" +
        "# For Bullet Points\n" +
        "* Use stars or use the list icon\n"+
        "___\n\n"+
        "# And Leave us feedback or suggestions!\n"+
        "## email: info@3dslides.io\n"+
    }
  },

  render: function() {
    return (
      <div>
      {  /* <div className="custom-page m-t-60 text-center">
          <h2 className="m-b-20">Now you can create your presentation in 3D with <strong>3D Slides</strong>!</h2>
          <a href="#" id="no-page-builder" className="btn btn-dark btn-lg btn-square">Awesome!</a>
          <a href="#" id="no-page-builder" className="btn btn-primary btn-lg btn-square">Let's Do It!</a>
        </div> */}
        <h2 style={styles.icon}><i className="icon-note" /> <strong>Slides</strong> Editor</h2>
        <div className="row">
          <div className="col-sm-12 portlets">
            <div className="panel maximized">
              <div className="panel-header">
                <div>
                    <Themes
                    updateTheme={this.props.updateTheme}
                    theme={this.props.theme}
                    />
                </div>

                <div>
                    <WorldSelector/>
                </div>
                <div>
                    <button style={styles.submitBtn}
                      type="submit"
                      id="no-page-builder"
                      onClick={this.props.postSub}
                      className="btn btn-primary btn-lg btn-square submitBtn"
                    >
                          Create Slideshow
                    </button>
                </div>

              </div>
              <div className="panel-content" style={styles.content}>
                <div className="row">
                  <div className="col-xs-12">
                    <MarkdownInstructions />

                    <textarea data-uk-htmleditor id="code-input-box" className="codeInputBox" defaultValue={this.getLocalStorage()} />
                    <div className="slide-preview col-md-3 pull-right"> </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

styles = {
  icon: {
    marginTop: "-2px",
    textAlign: "center"
  },
  // panel: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   paddingTop: "0"
  // },
  submitBtn: {
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "auto",
    top: '-21px',
    position: 'relative'

  },
  content: {
    paddingTop: "10px"
  }
}
{ /*<div className="slide-preview col-md-3"><img src={'build/assets/images/tron-world-bg.png'} /></div> */}
{ /*<button type="submit" onClick={this.props.postSub} className="btn btn-info">Submit</button> */ }

module.exports = CodeEditor;
