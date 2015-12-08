var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Header = require('./components/header.jsx');
var SideNav = require('./components/side-nav.jsx');
var MarkDown = require('./components/markDownEditor.jsx');

var SlidesCreator = React.createClass({
  render: function() {
    return (
      <section className="body">

        <Header/>

        <div className="inner-wrapper">

          <SideNav/>
          <MarkDown/>

        </div>
      </section>
    )
  }
});

ReactDOM.render(<SlidesCreator/>, document.getElementById('appContainer'));
