var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');


var MarkDown = React.createClass({
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
												<label className="col-md-1 control-label">Markdown</label>
                      <div className="col-md-11">
													<textarea name="content" data-plugin-markdown-editor  rows={16} defaultValue=
                          {"### Hello there\n    How are you?\n\n    I have a task for you :\n\n    Select from this text...\n    Click the bold on THIS WORD and make THESE ONE italic\n    Link GOOGLE to google.com\n    Test to insert image (and try to tab after write the image description)\n    Test Preview\n    And ending here... Click \"List\"\n\n    Enjoy!"} />
												</div>
											</div>

                      <label className="checkbox">
                      </label>
                      <hr />
                      <button type="submit" className="btn">Submit</button>

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
