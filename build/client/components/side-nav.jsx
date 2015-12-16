var React = require('react');
var ReactDOM = require('react-dom');
// var ReactRouter = require('react-router');

var SideNav = React.createClass({
  render: function() {
    return (

      <div>

      {/* BEGIN SIDEBAR */}
      <div className="sidebar">
        <div className="logopanel">
          <h1>
            <a href="#" />
          </h1>
        </div>
        <div className="sidebar-inner mCustomScrollbar _mCS_1">
          <div className="mCustomScrollBox mCS-light-thin" id="mCSB_1" style={{position: 'relative', height: '100%', overflow: 'hidden', maxWidth: '100%'}}>
            <div className="mCSB_container mCS_no_scrollbar" style={{position: 'relative', top: 0}}>
              <div className="sidebar-top" />
              <div className="menu-title">
                <span>Navigation</span>
                <div className="pull-right menu-settings">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" data-delay={300} aria-expanded="false">
                    { /*<i className="icon-settings"  /> */}
                  </a>
                </div>
              </div>
              <ul className="nav nav-sidebar">
              {/*  <li className=" tm nav-parent">
                  <a href="my-link.html">
                    <i className="icon-home" />
                    <span>HOME</span>
                  </a>
                </li> */}
                <li className="tm nav-active active">
                  <a href="#">
                    <i className="icon-puzzle" />
                    <span>BUILD</span>
                  </a>
                </li>
              </ul>
              <div className="sidebar-widgets" style={{}} />
              <div className="sidebar-footer clearfix" style={{height: 40}}>
                <a className="pull-left toggle_fullscreen" href="#" data-rel="tooltip" data-placement="top" data-original-title="Fullscreen">
                {/*   <i className="icon-size-fullscreen" /> */}
                </a>
              </div>
            </div>
            <div className="mCSB_scrollTools" style={{position: 'absolute', display: 'none', opacity: 0}}>
              <div className="mCSB_draggerContainer">
                <div className="mCSB_dragger" style={{position: 'absolute', top: 0, height: 411}} oncontextmenu="return false;">
                  <div className="mCSB_dragger_bar" style={{position: 'relative', lineHeight: 411}} />
                </div>
                <div className="mCSB_draggerRail" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END SIDEBAR */}

    </div>
    );
  }
});

module.exports = SideNav;
