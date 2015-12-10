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
                  <a href="#" className="fa fa-caret-down"></a>
                <a href="#" className="fa fa-times"></a>
                </div>

                <h2 className="panel-title">Code Editor</h2>
              </header>

              <div className="panel-body">
                <form className="form-horizontal form-bordered">
                  <div className="form-group">
                    {/* <label className="col-md-1 control-label">Markdown</label> */}
                  <div className="col-md-12">

                      <textarea rows={16} className="form-control" id="codemirror_html_code" name="code_html"
                        data-plugin-codemirror data-plugin-options="{ mode: text/html }" defaultValue=
                      {"    <html style=\"color: green\">\n    <head>\n
                      <title>Mixed HTML Example</title>\n
                      <style type=\"text/css\">\n    h1 {font-family: comic sans; color: #f0f;}\n\n
                       div {background: yellow !important;}\n\n    body {\n    max-width: 50em;\n
                         margin: 1em 2em 1em 5em;\n    }\n    </style>\n
                       </head>\n

                        <body>\n
                           <h1>Mixed HTML Example</h1>\n

                        </body>\n
                      </html>"} />

                    </div>
                  </div>

                  <label className="checkbox">
                  </label>
                  <hr />
                  <button type="submit" className="btn btn-info">Submit</button>

                </form>
              </div>
            </section>
          </div>
        </div>
        {/* end: page */}
      </section>
    );
  }
});

module.exports = CodeEditor;
