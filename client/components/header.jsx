var React = require('react');
var ReactDOM = require('react-dom');

var Header = React.createClass({
  render: function() {
    return (

      <div>

      {/* BEGIN TOPBAR */}
      <div className="topbar">
        <div className="header-left" style={{display: 'block'}}>
          <div className="topnav">
            <a className="menutoggle" href="#" data-toggle="sidebar-collapsed">
              <span className="menu__handle">
                <span>Menu</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* END TOPBAR */}

    </div>
    );
  }
});
module.exports = Header;
