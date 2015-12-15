var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var CodeEditor = React.createClass({
  render: function() {
    return (
      <div>
        <div className="custom-page m-t-60 text-center">
          <h2 className="m-b-20">Now you can create your presentation in 3D with <strong>3D Slides</strong>!</h2>
          <a href="#" id="no-page-builder" className="btn btn-dark btn-lg btn-square">Awesome!</a>
          <a href="#" id="no-page-builder" className="btn btn-primary btn-lg btn-square">Let's Do It!</a>
        </div>
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
                    <textarea data-uk-htmleditor defaultValue={"# **Markdown Demo**\n---\n\n### Changes are automatically rendered as you type.\n\n* Item\n* Item\n* Item\n* Item with `code` !\n\n## HTML block\n\n<blockquote>\n    <strong>This is a blockquote</strong>.\n</blockquote>\n\n## How about some code?\n\n```js\nvar React = require('react');\nvar ReactDom = require('react-dom');\n\nvar CommentBox = React.createClass({\n  render: function() {\n    return (\n      <div className=\"commentBox\">\n        Hello, world! I am a CommentBox.\n      </div>\n    );\n  }\n});\nReactDOM.render(\n  <CommentBox />,\n  document.getElementById('content')\n);\n```\n## More info?\n\nThis is a link [Link](//github.com/)\n\n---------------\n\n# What about HTML?\n\n<span>\n<img style=\"width: 80%; margin:0 auto; display: block;\" src=\"https://s-media-cache-ak0.pinimg.com/736x/fd/55/f6/fd55f6fafd8f42f17690081960005fed.jpg\" alt=\"the Octotron\">\n</span>\n\n\n                      "} />
                    <div className="custom-page m-t-60 text-center">
                      <a href="#" id="no-page-builder" onClick={this.props.postSub} className="btn btn-primary btn-lg btn-square">Create Slides</a>
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
