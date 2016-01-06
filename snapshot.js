			
			//			Slideshow Object			//

var Slideshow = function(camera) {

	document.addEventListener('keydown', function(e) {
		if (e.keyCode === 37 || e.keyCode === 39) TWEEN.removeAll();
		if (e.keyCode === 39) moveDefault(++_currentSnap);
		if (e.keyCode === 37) moveDefault(--_currentSnap);
		if (e.keyCode === 32) shuffle(c1, c2);

	});
	// Private Variables
	var _this = this;
	var _snapshots = [];
	var _currentSnap = -1;
	var _transitions = [];
	var c1 = 1;
	var c2 = 2;
	var shuffle = function(a, b) {
		var card1 = new TWEEN.Tween(glScene.children[imgSlide].children[a].position);
		var card2 = new TWEEN.Tween(glScene.children[imgSlide].children[b].position);
		// TODO: Fix the hard coding of this function
		card1.to({
			z: "-5"
		}, 300)
		.delay(100)
		.easing(TWEEN.Easing.Quadratic.In)
		.start();

		card2.to({
			x: [60, 20],
			z: [-52.5, -50]
		}, 725)
		.easing(TWEEN.Easing.Sinusoidal.Out)
		.start();

		var temp = c2;
		c2 = c1;
		c1 = temp;
	};


	var moveBack = function(index) {
		if(index > _snapshots.length - 1) _currentSnap = index = 0;
		if(index < 0) _currentSnap = index = _snapshots.length -1;

		var cameraTween = new TWEEN.Tween(camera.position),
			markerTween = new TWEEN.Tween(marker.position),
			look = new TWEEN.Tween(controls.target),
			dest = _snapshots[index];

		cameraTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 9,
			z: (dest.location.z + 30)
		}, 1200)
		.easing(TWEEN.Easing.Back.InOut)
		.start();

		markerTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 9,
			z: dest.location.z
		})
		.easing(TWEEN.Easing.Back.InOut)
		.start();

		look.to({
			x: dest.location.x + 25,
			y: dest.location.y - 11,
			z: dest.location.z
		}, 1200)
		.easing(TWEEN.Easing.Back.InOut)
		.start();
	};
	var moveExpo = function(index) {
		if(index > _snapshots.length - 1) _currentSnap = index = 0;
		if(index < 0) _currentSnap = index = _snapshots.length -1;

		var cameraTween = new TWEEN.Tween(camera.position),
			markerTween = new TWEEN.Tween(marker.position),
			look = new TWEEN.Tween(controls.target),
			dest = _snapshots[index];

		cameraTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 9,
			z: (dest.location.z + 30)
		})
		.easing(TWEEN.Easing.Exponential.InOut)
		.start();

		markerTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 9,
			z: dest.location.z
		})
		.easing(TWEEN.Easing.Exponential.InOut)
		.start();

		look.to({
			x: dest.location.x + 25,
			y: dest.location.y - 11,
			z: dest.location.z
		})
		.easing(TWEEN.Easing.Exponential.InOut)
		.start();
	};
	var moveSin = function(index) {
		if(index > _snapshots.length - 1) _currentSnap = index = 0;
		if(index < 0) _currentSnap = index = _snapshots.length -1;

		var cameraTween = new TWEEN.Tween(camera.position),
			markerTween = new TWEEN.Tween(marker.position),
			look = new TWEEN.Tween(controls.target),
			dest = _snapshots[index];

		cameraTween.to({
			x: dest.location.x + 25,
			y: [dest.location.y, dest.location.y - 9],
			z: [dest.location.z + 50, dest.location.z + 30]
		}, 1500)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

		markerTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 9,
			z: dest.location.z
		},1600)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();

		look.to({
			x: dest.location.x + 25,
			y: [dest.location.y - 9],
			z: dest.location.z
		}, 1400)
		.easing(TWEEN.Easing.Sinusoidal.InOut)
		.start();
	};
	var moveDefault = function(index) {
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
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();

		markerTween.to({
			x: dest.location.x + 25,
			y: dest.location.y - 13,
			z: dest.location.z
		})
		.easing(TWEEN.Easing.Quadratic.InOut)
		.start();

		look.to({
			x: dest.location.x + 25,
			y: dest.location.y - 11,
			z: dest.location.z
		})
		.easing(TWEEN.Easing.Quadratic.InOut)
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
setTimeout(function () {
	imgSlide = glScene.children.length - 2;
	glScene.children[imgSlide].children[2].position.set(20, 12, -55);
}, 0);
