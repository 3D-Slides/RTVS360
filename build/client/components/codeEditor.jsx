var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var CodeEditor = React.createClass({
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

                    <textarea data-uk-htmleditor id="code-input-box" defaultValue={"\n<h1>Welcome to 3D Slides Beta Version 0.0.1!</h1>\n<h1>You can currently use h1 tags,</h1>\n<h2>h2 tags,</h2>\n<h3>h3 tags,</h3>\n<ul>\n    <li>List items work!</li>\n    <li>Ordered and unordered lists render the same</li>\n    <li>Updates to tags rendered are currently in the works!</li>\n</ul>\n\n<p>paragraph tags render as well, if your list item runs too long, use a paragraph tag to escape to next line.</p>\n<hr />\n<h1>To start a new slide, use the 'hr' tag</h1>\n<p>Img tags, among others, will render with the next update, so hold tight!</p>\n<hr />\n\n# Same goes for markdown\n# H1 tags start with #\n## H2 tags start with ##\n### H3 tags start with ###\n\n* You can make an un-ordered list by preceding list items with either a * or a - \n- For now, ordered lists render the same\n\nTo start a paragraph with markdown, just start a new line with no indicators.\n\n# Now your all set! \n## Give it a try, have fun, and let us know what you want added!\n\n"} />
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
