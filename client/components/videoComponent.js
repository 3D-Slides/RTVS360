var React = require('react');

var VideoBox = React.createClass({

	getInitialState: function() {
		return {
			name: "yo!"
		}
	},

	click: function() {
		this.setState({
			name: "VideoBox!"
		})
	},

	// componentDidMount looks for changes in the component and if so -> execute what is wanted
	componentDidMount: function() {
		console.log('in componentDidMount');
		onYouTubeIframeAPIReady();
	},

	render: function() {
		console.log('video players are rendered');
		return (
			<div id="videoContainer">
				<h1 onClick={this.click}>
					<div style={{float: "left", margin: "15px"}}>
						<iframe id="player1" frameBorder="0" allowFullScreen="1"  style={{width:"640", height:"390"}}
						src="https://www.youtube.com/embed/0RPurvYriHI?modestbranding=1&amp;theme=light&amp;showinfo=0&amp;rel=0&amp;fs=0&amp;enablejsapi=1">
						</iframe>
					</div>
				</h1>
				<div style={{float: "left", margin: "15px"}}>
					<iframe id="player2" frameBorder="0" allowFullScreen="1" style={{width:"640", height:"390"}}
					src="https://www.youtube.com/embed/0RPurvYriHI?modestbranding=1&amp;theme=light&amp;showinfo=0&amp;rel=0&amp;fs=0&amp;enablejsapi=1">
					</iframe>
				</div>
			</div>
		)
	}
});

module.exports = VideoBox;