var React = require('react');
var ReactDOM = require('react-dom');

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
        <div className="row">
          <div className="col-md-12 portlets">
            <div className="panel">
              <div className="panel-header ">
                <h3><i className="icon-note" /> <strong>Code</strong> Editor</h3>
                <div className="control-btn">
                  <a href="#" className="panel-maximize"><i className="icon-size-fullscreen" /></a>
                </div>
              </div>
              <div className="panel-content">
                <div className="row">
                  <div className="col-md-12">

                    <textarea data-uk-htmleditor id="code-input-box" defaultValue={this.getLocalStorage()} />
                    <div className="custom-page m-t-60 text-center">
                      <button type="submit" id="no-page-builder" onClick={this.props.postSub} className="btn btn-primary btn-lg btn-square">Create Slides</button>
                    </div>

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

{ /*<div className="slide-preview col-md-3"><img src={'build/assets/images/tron-world-bg.png'} /></div> */}
{ /*<button type="submit" onClick={this.props.postSub} className="btn btn-info">Submit</button> */ }

module.exports = CodeEditor;
