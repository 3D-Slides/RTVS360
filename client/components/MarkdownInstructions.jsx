var React = require('react');

var MarkdownInstructions = React.createClass({

	showInfo: function () {
		console.log('entering!');
		document.getElementById('mkdnInfo').className = 'fadeIn';
	},

	hideInfo: function () {
		console.log('leaving!');
		document.getElementById('mkdnInfo').className = 'displayNone';
	},

	render: function () {
		return (
			<div onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo} id="mkdnHelp" className='mkdnButton'>
				?
				<div style={mkdnInfoStyles} id="mkdnInfo" className="displayNone">
					<span style={bold}> Supported Markdown:</span><br/>
					<span style={bold}>Headers: </span><br/>
					# Large Title<br/>
					## Sub Title 1<br/>
					### Sub Title 2<br/>
					#### Sub Title 3<br/>
					<span style={bold}>ListItems:</span><br/>
					* Item<br/>
					* Item<br/>
					* Item<br/>
					<span style={bold}> Paragraphs:</span><br/>
					Paragraphs do not need indicators<br/>
					<span style={bold}>Images:</span><br/>
					![](image url goes here)<br/>
				</div>
			</div>
		)
	}
});

var bold = {
	fontWeight: '700',
}

var mkdnInfoStyles = {
	lineHeight: '20px',
	fontSize: '12px'
}

module.exports = MarkdownInstructions;

//onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo}