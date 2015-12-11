var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');


var MarkDown = React.createClass({
	// console.log(this.props, this.postSub);
  render: function() {
    return (
      <div>

        <section role="main" className="content-body">
					<header className="page-header">
						<h2>Slide Creator</h2>
					</header>

					{/* start: page */}

						<div className="row">
							<div className="col-xs-12">
								<section className="panel">
									<header className="panel-heading">
										<div className="panel-actions">
											<a href="#" className="fa fa-caret-down"></a>
                    <a href="#" className="fa fa-times"></a>
										</div>

										<h2 className="panel-title">Markdown Editor</h2>
									</header>

									<div className="panel-body">
										<form className="form-horizontal form-bordered">
											<div className="form-group">
												{/* <label className="col-md-1 control-label">Markdown</label> */}
                      <div className="col-md-12">

													<textarea name="content" id="markdownInput" data-plugin-markdown-editor rows={16} defaultValue=

                          {"### Hello there\n\n    How are you?\n\n    I have a task for you :\n\n    Select from this text...\n\n    Click the bold on THIS WORD and make THESE WORDS italic\n\n    Link GOOGLE to google.com\n\n    Test to insert an image (and try to tab over after you write the image in the description)\n    And ending here...\n\n    Enjoy!"} />
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
					{/* end: page */}
				</section>
      </div>
    );
  }
});

module.exports = MarkDown;
