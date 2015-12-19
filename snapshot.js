			//			Slideshow Object			//

var Slideshow = function(camera) {
	document.addEventListener('keydown', function(e) {
		if (e.keyCode === 37 || e.keyCode === 39) TWEEN.removeAll();
		if (e.keyCode === 39) move(++_currentSnap);
		if (e.keyCode === 37) move(--_currentSnap);

	});
	// Private Variables
	var _this = this;
	var _snapshots = [];
	var _currentSnap = -1;
	var _transitions = [];

	var shuffle = function() {
		// TODO: Fix the hard coding of this function
		var card1 = new TWEEN.Tween(glScene.children[8].children[1].position);
		var card2A = new TWEEN.Tween(glScene.children[8].children[2].position);
		var card2B = new TWEEN.Tween(glScene.children[8].children[2].position);
		var card2C = new TWEEN.Tween(glScene.children[8].children[2].position);
		card1.to({
			z: -60
		}, 400)
		.delay(200)
		.easing(TWEEN.Easing.Quadratic.In)
		.start();

		card2A.to({
			x: 130
		}, 500)
		.easing(TWEEN.Easing.Cubic.InOut)
		.start();

		card2B.to({
			z: -50
		}, 500)
		.easing(TWEEN.Easing.Linear.None)
		.start();

		card2C.to({
			x: 85
		}, 500)
		.easing(TWEEN.Easing.Cubic.InOut);

		card2A.chain(card2B).chain(card2C).start();
	};

	var move = function(index) {
		if (index > _snapshots.length - 1) _currentSnap = index = 0;
		if (index < 0) _currentSnap = index = _snapshots.length - 1;

		var cameraTween = new TWEEN.Tween(camera.position),
			markerTween = new TWEEN.Tween(marker.position),
			look = new TWEEN.Tween(controls.target),
			dest = _snapshots[index];

		cameraTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 9,
			z: (dest.location.z + 30)
		}, 1500)
		.easing(_transitions[index])
		.start();

		markerTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 13,
			z: dest.location.z
		})
		.easing(_transitions[index])
		.start();

		look.to({
			x: dest.location.x + 25,
			y: dest.location.y - 11,
			z: dest.location.z
		})
		.easing(_transitions[index])
		.start();

	};

	this.addSnapshot = function(location, rotation, options) {
		_snapshots.push( new Snapshot(location, rotation, options) );
	};

	this.addTransitionTo = function(snapshotNum, animateType) {
		var arg2 = animateType;
		animateType = animateType.split('.');

		var ease = animateType[0];
		var style = animateType[1];
		var count = 0;
		if (snapshotNum === 'all') {
			for (var i = 0; i < _snapshots.length; i++) {
				_this.addTransitionTo(i, arg2);
			}
		} else {
			if (TWEEN.Easing[ease][style]) {
				_transitions[snapshotNum] = TWEEN.Easing[ease][style];
			} else {
				console.error('There is a problem adding this transition. Please check spelling and/or make sure this transition property exists.');
			}
			// warn for missing transitions
			for (var j = 0; j < snapshotNum; j++) {
				if (!_transitions[j]) count++;
			}
			if (count > 0) {
				console.warn('ALERT! You are missing ' + count + ' transitions between your snapshots.');
			}
		}
	};

	this.presentSlideshow = function () {
		// remove all of the scene helpers
	};
};
Slideshow.prototype.constructor = Slideshow;


			//			Snapshot Object			//

var Snapshot = function(location, rotation, options) {
	var _this = this;
	var _coords = {};
	if (!rotation) rotation = new THREE.Vector3(0,0,0);

	function loadCoords(key, vector) {
		if (vector instanceof THREE.Vector3) {
			_coords[key] = JSON.parse(JSON.stringify(vector));
		} else if (vector.constructor === Array) {
			_coords[key] = new THREE.Vector3(vector[0], vector[1], vector[2]);
		} else {
			console.error("These are not coordinates!");
		}
	}

	loadCoords('location', location);
	loadCoords('rotation', rotation);
	return _coords;
};
Snapshot.prototype.constructor = Snapshot;


var show = new Slideshow(camera);
var posArray = SlideGenerator.slideLocations;
var saveCoords = R.forEach(function(coord) {
	moveCoord = [ coord[0], coord[1], coord[2] ];
	show.addSnapshot(moveCoord);
})(posArray);
show.addTransitionTo('all', 'Quadratic.InOut');





