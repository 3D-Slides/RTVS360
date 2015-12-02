var el = window;
el.addEventListener('keydown', rotateBox);

//CONSTRUCT CABIN SPHERE
loader.load('./assets/2294472375_24a3b8ef46_o.jpg', function ( texture ) {
	var mainPlaneGeometry = new THREE.SphereGeometry(3500, 50, 50);
	var mainPlaneMaterial = new THREE.MeshBasicMaterial({
		map: texture,
		side: THREE.DoubleSide
	});
	mainPlaneGeometry.scale(-1,1,1);
	mainPlane = new THREE.Mesh(mainPlaneGeometry, mainPlaneMaterial);
	glScene.add( mainPlane );
	mainPlane.position.copy(pivot.position);
});

// CREATE THE PIVOT SO CAMERA MOVES AROUND BOX
pivot = new THREE.Group();
pivot.position.set(5000, 5000, 5000);
glScene.add(pivot);

var planeGeometry = new THREE.PlaneGeometry(400, 250);
var planeMaterial = new THREE.MeshBasicMaterial({
	color: 0x000000,
	opacity: 0,
	side: THREE.DoubleSide,
	blending: THREE.NoBlending
});
plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0,0,300);

//CONSTRUCT ANOTHER PLANE FOR OLSEN PICTURE
var olsenGeometry = new THREE.PlaneGeometry(400,250);
var olsenMaterial = new THREE.MeshBasicMaterial({
	color: 0x000000,
	opacity: 0,
	side: THREE.DoubleSide,
	blending: THREE.NoBlending
});
olsenPlane = new THREE.Mesh(olsenGeometry, olsenMaterial);
olsenPlane.position.set( 0,0,-300 );

//CONSTRUCT ANOTHER PLANE FOR FANTASY PICTURE
var fantasyGeometry = new THREE.PlaneGeometry(400,250);
var fantasyMaterial = new THREE.MeshBasicMaterial({
	color: 0x000000,
	opacity: 0,
	side: THREE.DoubleSide,
	blending: THREE.NoBlending
});
fantasyPlane = new THREE.Mesh(fantasyGeometry, fantasyMaterial);
fantasyPlane.position.set( 300,0,0 );
fantasyPlane.rotation.y = Math.PI/2;

//CONSTRUCT ANOTHER PLANE FOR LION PICTURE
var lionGeometry = new THREE.PlaneGeometry(400,250);
var lionMaterial = new THREE.MeshBasicMaterial({
	color: 0x000000,
	opacity: 0,
	side: THREE.DoubleSide,
	blending: THREE.NoBlending
});
lionPlane = new THREE.Mesh(lionGeometry, lionMaterial);
lionPlane.position.set( -300,0,0 );
lionPlane.rotation.y = Math.PI/2;

pivot.add(plane, olsenPlane, fantasyPlane, lionPlane );

var img = document.createElement('img');
img.className = 'slide';
img.src = "http://www.pageresource.com/wallpapers/wallpaper/cool-cat.jpg";
threeDOM1 = new THREE.CSS3DObject(img);
threeDOM1.position.set(0,0,300);
cssScene.add(threeDOM1);

var img2 = document.createElement('img');
img2.className = 'slide';
img2.src = 'http://www.pageresource.com/wallpapers/wallpaper/final-fantasy-vii-anime-cloud-strife-sephiroth_358135.jpg';
threeDOM2 = new THREE.CSS3DObject(img2);
threeDOM2.position.set(300,0,0);
threeDOM2.rotation.y = Math.PI/2;
cssScene.add(threeDOM2);

var img3 = document.createElement('img');
img3.className = 'slide';
img3.src = 'http://www.pageresource.com/wallpapers/wallpaper/olsen-twins-hot_200056.jpg';
threeDOM3 = new THREE.CSS3DObject(img3);
threeDOM3.position.set(0,0,-300);
cssScene.add(threeDOM3);


var img4 = document.createElement('img');
img4.className = 'slide';
img4.src = 'http://www.pageresource.com/wallpapers/wallpaper/lion-noir-blanc-fond-cran_608217.jpg';
threeDOM4 = new THREE.CSS3DObject(img4);
threeDOM4.position.set(-300,0,0);
threeDOM4.rotation.y = Math.PI/2;
cssScene.add(threeDOM4);


function rotateBox(e) {
	var TIME = 300;
	var RADIANS = Math.PI / 2;
	var key = e.keyIdentifier;
	var rotationCache = {
		x: pivot.rotation.x,
		y: pivot.rotation.y
	};
	pivot.rotation.y = pivot.rotation.y % (2 * Math.PI);

	createjs.Ticker.setFPS(60);
	var motion = createjs.Tween.get(pivot.rotation);
		
	if(pivot.rotation.x % RADIANS !== 0) {
		if(key === 'Up') {
			pivot.rotation.x = rotationCache.x - RADIANS;
			console.log('up auto');
		}
		if(key === 'Down') {
			pivot.rotation.x = rotationCache.x + RADIANS;
			console.log('down auto');
		}
	}
	if(key === "U+0020") {
		var ballerPosition = createjs.Tween.get(camera.position);
		var ballerTarget = createjs.Tween.get(controls.target);

		ballerPosition.to({
			x: 5000,
			y: 5000,
			z: 5900
		}, 4000, createjs.Ease.linear);

		ballerTarget.to({
			x: 5000,
			y: 5000,
			z: 5000
		}, 2000, createjs.Ease.linear);
	}
	if(pivot.rotation.y % RADIANS === 0 && pivot.rotation.x % RADIANS === 0) {
		if(key === 'Right') {
			motion.to({y: pivot.rotation.y + RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('right');
		}
		if(key === 'Left') {
			motion.to({y: pivot.rotation.y - RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('left');
		}
		if(key === 'Up') {
			motion.to({x: pivot.rotation.x - RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('up');
		}
		if(key === 'Down') {
			motion.to({x: pivot.rotation.x + RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('down');
		}
	}
}