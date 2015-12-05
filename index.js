var glScene, glRenderer;
var box, plane, slidePlane, floor, olsenPlane, fantasyPlane, lionPlane, mainPlane;
var pivot;

var cssScene, cssRenderer, cssMeshes;
var threeDOM, threeDOM1, threeDOM2, threeDOM3, threeDOM4;

var camera, controls, item;

var cameraPivot;

var loader;

// window.onload = function(){


// }

init();
render();

//USER INPUT:::::::::
var SlideGenerator = new SlideGenerator();
var slidesPositions = [[0,0,0],[2000,0,0],[4000,0,0]];
var TwoDPositions = [[0,1000,0],[2000,1000,0],[4000,1000,0]];
var slidesArray = SlideGenerator.getSlides();
console.log('slidesArray:', slidesArray, 'slidesPositions:', slidesPositions)
SlideGenerator.addAllSlides3D( slidesArray, slidesPositions );
//SlideGenerator.addAllSlides(slidesArray, TwoDPositions);
//:::::::::::::::::::

function init() {

	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;

	glScene = new THREE.Scene();
	cssScene = new THREE.Scene();
	loader = new THREE.TextureLoader();
	
	var axisHelper = new THREE.AxisHelper(10000);
	glScene.add(axisHelper);

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 60000);
	camera.position.set (0, 1500, 20000);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	glScene.add(camera);

	// Add Directional Light for cube to determine positioning
	var lights = new THREE.DirectionalLight(0xffffff, 2, 15000);
	lights.position.set(500, 200, 0);
	lights.target.position.set(0, 0, -2000);
	lights.castShadow = true;
	//camera.add(lights);

	var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
	glScene.add(light);


					// TODO
/*_____________________________________________________________________*/


	// CONSTRUCT A FLOOR
	var floorGeometry = new THREE.PlaneGeometry(40000, 42000);
	var floorMaterial = new THREE.MeshLambertMaterial({
		color: 0x1d1d1c,
		// wireframe: true,
		// wireframeLineWidth: 5,
		side: THREE.DoubleSide
	});
	floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI/2;
	floor.position.set(0, -200, -1000);
	glScene.add(floor);

	var size = 20000, step = 2000;
	var yDepth = 0;
	var grid = new THREE.Group();
	var material = new THREE.LineBasicMaterial({
		// color: 0x01D5DA,
		color: 0x00D1FF,
		linewidth: 0.5
	});

	for (var i = -size; i <= size; i += step) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(-i, -yDepth, size));
		geometry.vertices.push(new THREE.Vector3(-i, -yDepth, -size));

		var line = new THREE.Line( geometry, material);

		grid.add(line);
	}

	for (var i = -size; i <= size; i += step) {

		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(size, -yDepth, -i));
		geometry.vertices.push(new THREE.Vector3(-size, -yDepth, -i));

		var line = new THREE.Line( geometry, material);

		grid.add(line);
	}
	glScene.add(grid);
	glScene.fog = new THREE.Fog(0x000000, 2000, 35000);

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
	document.body.appendChild( glRenderer.domElement );

	// CREATE THE CSSRENDERER
	cssRenderer = new THREE.CSS3DRenderer();
	cssRenderer.setSize(WIDTH, HEIGHT);
	cssRenderer.domElement.className = 'css-renderer';
	cssRenderer.domElement.style.position = 'absolute';
	cssRenderer.domElement.style.top = 0;
	document.body.appendChild( cssRenderer.domElement );

	controls = new THREE.TrackballControls(camera, glRenderer.domElement);
	// controls.maxDistance = 9000;

	// create window resize function
	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize() {

		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;
		ASPECT = window.innerWidth / window.innerHeight;

		camera.aspect = ASPECT;
		camera.updateProjectionMatrix();

		glRenderer.setSize( WIDTH, HEIGHT );

	}
}

function render() {
	requestAnimationFrame(render);
	controls.update();
	glRenderer.render(glScene, camera);
	cssRenderer.render(cssScene, camera);

	//if (pivot) pivot.rotation.y += 0.01;
	camera.lookAt( glScene.position );
	animate();
}

function animate () {

	if (threeDOM1) {
		//plane.rotation.y = pivot.rotation.y;
		threeDOM1.position.x = (300 * Math.cos(-1*(pivot.rotation.y - Math.PI/2))) + pivot.position.x;
		threeDOM1.position.y = pivot.position.y;
		threeDOM1.position.z = (300 * Math.sin(-1*(pivot.rotation.y - Math.PI/2))) + pivot.position.z;
		threeDOM1.rotation.y = pivot.rotation.y;

	}
	if (threeDOM2) {
		//fantasyPlane.rotation.y = pivot.rotation.y + Math.PI/2;
		threeDOM2.position.x = (300 * Math.cos((pivot.rotation.y)*(-1))) + pivot.position.x;
		threeDOM2.position.y = pivot.position.y;
		threeDOM2.position.z = (300 * Math.sin((pivot.rotation.y)*(-1))) + pivot.position.z;
		threeDOM2.rotation.y = pivot.rotation.y + Math.PI/2;
	}
	if (threeDOM3) {
		//olsenPlane.rotation.y = pivot.rotation.y;
		threeDOM3.position.x = (300 * Math.cos((pivot.rotation.y + Math.PI/2)*(-1))) + pivot.position.x;
		threeDOM3.position.y = pivot.position.y;
		threeDOM3.position.z = (300 * Math.sin((pivot.rotation.y + Math.PI/2)*(-1))) + pivot.position.z;
		threeDOM3.rotation.y = pivot.rotation.y;
	}
	if (threeDOM4) {
		//lionPlane.rotation.y = pivot.rotation.y - Math.PI/2;
		threeDOM4.position.x = (300 * Math.cos((pivot.rotation.y + Math.PI)*(-1))) + pivot.position.x;
		threeDOM4.position.y = pivot.position.y;
		threeDOM4.position.z = (300 * Math.sin((pivot.rotation.y + Math.PI)*(-1))) + pivot.position.z;
		threeDOM4.rotation.y = pivot.rotation.y - Math.PI/2;
	}

	// space.update();
}
