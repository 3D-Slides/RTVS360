var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var SideNav = React.createClass({
  render: function() {
    return (

      <div>
        {/* start: sidebar-nav */}

				<aside id="sidebar-left" className="sidebar-left">

					<div className="sidebar-header">
						<div className="sidebar-title">
							Navigation
						</div>
						<div className="sidebar-toggle hidden-xs" data-toggle-classname="sidebar-left-collapsed"
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
      </div>
    );
  }
});

module.exports = SideNav;
