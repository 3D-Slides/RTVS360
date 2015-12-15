var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');


var CodeEditor = React.createClass({
  render: function() {
    return (
      <div>

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

                  <div className="col-md-12">
                  
                    // added an ID to this box, enables us to grab the value and send to 3D presentation
                    <textarea data-uk-htmleditor id="codeInputBox" defaultValue={"..."} />
                    {/* Test */}




                  </div>
                </div>

                <label className="checkbox">
                </label>
                <hr />

                <button type="submit" onClick={this.props.postSub} className="btn btn-info">Submit</button>


              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
    </div>


    );
  }
});

module.exports = CodeEditor;
