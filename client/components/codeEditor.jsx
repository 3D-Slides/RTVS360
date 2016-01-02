var React = require('react');
var ReactDOM = require('react-dom');
var Themes = require('./Themes.jsx');
var WorldSelector = require('./WorldSelector.jsx');

var CodeEditor = React.createClass({
  getLocalStorage: function () {
    if(window.localStorage.input){
      return window.localStorage.input;
    } else {
      return "# Welcome to 3D Slides Beta Version 0.0.1!\n# For HTML you can currently use h1 tags,\n## h2 tags\n### h3 tags\n\n* List items work!\n* Ordered and unordered lists render the same\n* Updates to tags rendered are currently in the works!\n___\n\n# Paragraphs\nParagraph tags render as well, if your list item runs too long, \nuse a paragraph tag to escape to next line.\n___\n\n# To start a new slide, use the 'hr' tag\n\nImg tags, among others, will render with the next update, so hold tight!\n___\n\n# Same goes for markdown\n# H1 works\n## H2 works\n### H3 works\n\n* You can make an un-ordered list by preceding list items with either a * or a - \n- For now, ordered lists render the same\n___\n\n# To create a new slide in markdown\n## Use three underscores\n\nTo start a paragraph with markdown, just start a new line with no indicators.\n\n# Now your all set! \n\nGive it a try, have fun, and let us know what you want added!";
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
              <div style={styles.panel} className="panel-header">
                <Themes
                  updateTheme={this.props.updateTheme}
                  theme={this.props.theme}
                />
                <WorldSelector/>
                <button style={styles.btn}
                  type="submit"
                  id="no-page-builder"
                  onClick={this.props.postSub}
                  className="btn btn-primary btn-lg btn-square">
                      Create Slideshow
                  </button>
              </div>
              <div className="panel-content" style={styles.content}>
                <div className="row">
                  <div className="col-xs-12">
                    <textarea data-uk-htmleditor id="code-input-box" defaultValue={this.getLocalStorage()} />
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
  panel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: "0"
  },
  btn: {
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "auto"
  },
  content: {
    paddingTop: "10px"
  }
}
{ /*<div className="slide-preview col-md-3"><img src={'build/assets/images/tron-world-bg.png'} /></div> */}
{ /*<button type="submit" onClick={this.props.postSub} className="btn btn-info">Submit</button> */ }

module.exports = CodeEditor;
