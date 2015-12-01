var glScene, glRenderer;
var box, plane, floor;

var cssScene, cssRenderer;
var threeDOM, item;

var camera, controls;

var el = window;
el.addEventListener('keydown', rotateBox);
init();
render();

function init() {
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;

	glScene = new THREE.Scene();
	cssScene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 40000);
	camera.position.set (200, 350, 1900);
	camera.lookAt(new THREE.Vector3(0, 0, 0));


	// CONTRUCTING A BOX FOR WEBGL RENDERER
	var boxGeometry = new THREE.BoxGeometry(300,300,300);
	var boxMaterial = new THREE.MeshLambertMaterial({
		color: 0xBADA55
	});
	box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.position.set(-500, -300, 800);
	glScene.add(box);


	// CONSTRUCT A FLOOR
	var floorGeometry = new THREE.PlaneGeometry(7500, 7500);
	var floorMaterial = new THREE.MeshBasicMaterial({
		map:THREE.ImageUtils.loadTexture('assets/lava.jpg'),
		side: THREE.DoubleSide
	});
	floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI/2;
	floor.position.set(0, -450, -1000);
	glScene.add(floor);


	// CONTRUCT A plane TO SHOW CLEAR IN THE BACKGROUND
	var planeGeometry = new THREE.PlaneGeometry(1600, 760);
	var planeMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		opacity: 0,
		side: THREE.DoubleSide,
		blending: THREE.NoBlending
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.position.set(0, -300, 0)
	glScene.add(plane);

	var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
	glScene.add(light);


							// CSS ELEMENTS
/*_____________________________________________________________________*/

	var slides = document.getElementsByClassName('reveal')[0];
	threeDOM = new THREE.CSS3DObject(slides);

	cssScene.add(threeDOM);
/*_____________________________________________________________________*/

	// CREATE THE GLRENDERER AND APPEND IT ON TOP OF HTML
	// OR THE CSSRENDERER
	glRenderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	glRenderer.setSize(WIDTH, HEIGHT);
	glRenderer.setPixelRatio(window.devicePixelRatio);
	glRenderer.setClearColor(0xFFFFFF, 0);
	glRenderer.domElement.style.position = 'absolute';
	glRenderer.domElement.style.top = 0;
	glRenderer.domElement.style.zIndex = 1;
	document.body.appendChild(glRenderer.domElement);

	// CREATE THE CSSRENDERER
	cssRenderer = new THREE.CSS3DRenderer();
	cssRenderer.setSize(WIDTH, HEIGHT);
	cssRenderer.domElement.className = 'css-renderer';
	cssRenderer.domElement.style.position = 'absolute';
	cssRenderer.domElement.style.top = 0;
	document.body.appendChild(cssRenderer.domElement);

	controls = new THREE.TrackballControls(camera, glRenderer.domElement);
}

function render() {
	requestAnimationFrame(render);
	controls.update();
	glRenderer.render(glScene, camera);
	cssRenderer.render(cssScene, camera);
	animate();
}

function animate () {

	plane.position.x = item.translateX;
	plane.position.y = item.translateY;
	plane.position.z = item.translateZ;

	plane.rotation.x = item.rotateX * Math.PI/180;
	plane.rotation.y = item.rotateY * Math.PI/180;
	plane.rotation.z = item.rotateZ * Math.PI/180;

	plane.scale.set(item.size, item.size, 1);

	threeDOM.position.copy(plane.position);
	threeDOM.rotation.copy(plane.rotation);
	threeDOM.scale.copy(plane.scale);



}

function rotateBox(e) {
	var TIME = 1000;
	var RADIANS = Math.PI / 2;
	var key = e.keyIdentifier;
	var rotationCache = {
		x: box.rotation.x,
		y: box.rotation.y
	};

	createjs.Ticker.setFPS(60);
	var motion = createjs.Tween.get(box.rotation);
	if(key === 'Right') {
		motion.to({y: box.rotation.y + RADIANS}, TIME, createjs.Ease.getBackOut(2));
	}
	if(key === 'Left') {
		motion.to({y: box.rotation.y - RADIANS}, TIME, createjs.Ease.getBackOut(2));
	}
	if(key === 'Up') {
		motion.to({x: box.rotation.x - RADIANS}, TIME, createjs.Ease.getBackOut(2));
	}
	if(key === 'Down') {
		motion.to({x: box.rotation.x + RADIANS}, TIME, createjs.Ease.getBackOut(2));
	}
}
