			//			Slideshow Object			//

var Slideshow = function(camera) {
	document.addEventListener('keydown', function(e) {
		if (e.keyIdentifier === 'Left' || e.keyIdentifier === 'Right') TWEEN.removeAll();
		if (e.keyIdentifier === 'Right') move(++_currentSnap);
		if (e.keyIdentifier === 'Left') move(--_currentSnap);
	});
	// Private Variables
	var _this = this;
	var _snapshots = [];
	var _currentSnap = 0;
	var _transitions = [];

	var move = function(index) {
		var posTween = new TWEEN.Tween(camera.position);
		var rotTween = new TWEEN.Tween(camera.rotation);
		var dest = _snapshots[index];

		posTween
			.to({
				x: dest.location.x,
				y: dest.location.y,
				z: dest.location.z
			})
			.easing(_transitions[index])
			.start();

		rotTween
			.to({
				x: dest.rotation.x,
				y: dest.rotation.y,
				z: dest.rotation.z
			})
			.easing(_transitions[index])
			.start();

		if (_currentSnap === _snapshots.length - 1) _currentSnap = -1;
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
				console.error(`There is a problem adding this transition. Please check spelling and/or make sure this transition property exists.`);
			}

			// warn for missing transitions
			for (var i = 0; i < snapshotNum; i++) {
				if (!_transitions[i]) count++;
			}
			if (count > 0) {
				console.warn(`ALERT! You are missing ${count} transitions between your snapshots.`);
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
	this.coords = {};
	if (!rotation) rotation = new THREE.Vector3(0,0,0);

	var loadCoords = function(key, vector) {
		if (vector instanceof THREE.Vector3) {
			_this.coords[key] = JSON.parse(JSON.stringify(vector));
		} else if (vector.constructor === Array) {
			_this.coords[key] = new THREE.Vector3(vector[0], vector[1], vector[2]);
		} else {
			console.error("These are not coordinates!");
		}
	};

	loadCoords('location', location);
	loadCoords('rotation', rotation);

	return this.coords;
};
Snapshot.prototype.constructor = Snapshot;

var x = new Slideshow(camera);
x.addSnapshot(camera.position, [0, 0, 0], null);
x.addSnapshot([300, 700, 300]);
x.addSnapshot([1000, -1000, 1500], [0, 0, Math.PI/2]);
x.addTransitionTo('all', 'Cubic.InOut');



