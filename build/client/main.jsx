var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var request = require('request');


var SlidesCreator = React.createClass({

	postSubmit: function (event) {
		event.preventDefault();
		var markdownText = document.getElementById('markdownInput').value;
		var markString = JSON.stringify(markdownText);
		
		request({
			url: 'http://localhost:3131/presentation',
			method: 'POST',
			headers: {
				'Content-Type': 'text/html',
				'data': JSON.stringify(markdownText)
			}
		}, function (error,response,body) {
			if(error) {
				console.log(error);
			} else {
				console.log(response.statusCode, response.headers);
			}
		})
		// localStorage.setItem('markDown', JSON.stringify(markdownText));
		document.cookie = `${markString}`;

		window.location.href = 'http://localhost:3131/presentation';
	},

	render: function() {
	return (
	  <section className="body">

	  {/* start: header */}

			<header className="header">
				<div className="logo-container">
					<a href="../" className="logo">
						<img src="build/assets/images/logo.png" height="35"/>
					</a>
					<div className="visible-xs toggle-sidebar-left" data-toggle-className="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
						<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
					</div>
				</div>
			</header>

			{/* end: header */}

			<div className="inner-wrapper">

				{/* start: sidebar-nav */}

				<aside id="sidebar-left" className="sidebar-left">

					<div className="sidebar-header">
						<div className="sidebar-title">
							Navigation
						</div>
						<div className="sidebar-toggle hidden-xs" data-toggle-className="sidebar-left-collapsed"
						data-target="html" data-fire-event="sidebar-left-toggle">
							<i className="fa fa-bars" aria-label="Toggle sidebar"></i>
						</div>
					</div>

					<div className="nano">
						<div className="nano-content">
							<nav id="menu" className="nav-main" role="navigation">
								<ul className="nav nav-main">

									<li className="nav-parent nav-expanded nav-active">
										<a>
											<i className="fa fa-file-text-o" aria-hidden="true"></i>
											<span>Slide Types</span>
										</a>
										<ul className="nav nav-children">
											<li>
												<a href="">
													 Text Slide Creation
												</a>
											</li>
											<li className="nav-active">
												<a href="">
													 Mark Up Slide Creation
												</a>
											</li>
											<li>
												<a href="">
													 Code Slide Creation
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</nav>

							<hr className="separator" />
	        <hr className="separator" />

						</div>

					</div>

				</aside>
				{/* end: sidebar-nav */}

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
													<textarea name="content" id="markdownInput" data-plugin-markdown-editor rows={16} defaultValue=
	                      {"# Hello there\n YOOO \n##How are you?\n\nI have a task for you :\n\nSelect from this text...\n\nClick the bold on THIS WORD and make THESE ONE italic\n"} />
												</div>
											</div>

	                  <label className="checkbox">
	                  </label>
	                  <hr />
	                  <button type="submit" onClick={this.postSubmit} className="btn">Submit</button>

										</form>
									</div>
								</section>
							</div>
						</div>
					{/* end: page */}
				</section>
			</div>
	  </section>
	)
	}
});

ReactDOM.render(<SlidesCreator/>, document.getElementById('appContainer'));
