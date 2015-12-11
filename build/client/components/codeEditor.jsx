var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var CodeEditor = React.createClass({
  render: function() {
    return (

      <section role="main" className="content-body">

        {/* start: page */}
      <div className="row">
        <div className="col-xs-12">
          <section className="panel">
            <header className="panel-heading">
              <div className="panel-actions">
                <a href="#" className="fa fa-caret-down" />
                <a href="#" className="fa fa-times" />
              </div>
              <h2 className="panel-title">Code Editor</h2>
            </header>

            <div className="panel-body">
              <form className="form-horizontal" action="#">
                <div className="form-group">
                  <label className="col-md-2 control-label" htmlFor="textareaDefault">HTML Editor</label>
                  <div className="col-md-10">
                    <textarea rows={16} className="form-control" id="codemirror_html_code" name="code_html" data-plugin-codemirror data-plugin-options={ mode: "text/html", theme: "solarized" } />
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
      {/* end: page */}
    );
  }
});

module.exports = CodeEditor;
