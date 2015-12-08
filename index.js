var glScene, glRenderer;
var box, plane, slidePlane, floor, olsenPlane, fantasyPlane, lionPlane, mainPlane, marker;
var cssScene, cssRenderer, cssMeshes;
var camera, controls, spotLight;
var cameraPivot;
var loader;

init();
render();

//USER INPUT:::::::::
var SlideGenerator = new SlideGenerator();
var slidesPositions = [[-10,20,0],[0,5,0],[10,5,0]];
var slidesArray = SlideGenerator.getSlides();
console.log(slidesArray);
SlideGenerator.addAllSlides3D( slidesArray, slidesPositions );
//:::::::::::::::::::

function init() {

						// INIT SCENE PROCEDURES
/*_____________________________________________________________________*/
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;

	glScene = new THREE.Scene();
	glScene.fog = new THREE.FogExp2(0x000000, 0.05);
	cssScene = new THREE.Scene();
	loader = new THREE.TextureLoader();

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 20000);
	camera.position.set (0, 10, 20);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	spotLight = new THREE.SpotLight(0xffffff, 2, 3000, Math.PI/9, 0.001);
	spotLight.position.set(0, 20, 35);
	spotLight.castShadow = true;
	spotLight.shadowMapWidth = 1024;
	spotLight.shadowMapHeight = 1024;
	spotLight.shadowCameraNear = 1;
	spotLight.shadowCameraFar = 1000;
	camera.add(spotLight);

	glScene.add(camera);

	var spotLightHelper = new THREE.SpotLightHelper(spotLight);
	glScene.add(spotLightHelper);
	


					// CONSTRUCTING A TRON GRID
/*_____________________________________________________________________*/
	var markerGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	var markerMaterial = new THREE.MeshBasicMaterial({
		color: 0xFF0000
	});
	marker = new THREE.Mesh(markerGeometry, markerMaterial);
	glScene.add(marker);

	// CONSTRUCT A FLOOR
	var floorGeometry = new THREE.PlaneGeometry(400, 400, 80, 80);
	var floorMaterial = new THREE.MeshPhongMaterial({
		color: 0x1F1E24,
		side: THREE.DoubleSide,
	});
	floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI/2;
	floor.position.set(0, -0.1, 0);
	floor.receiveShadow = true;
	glScene.add(floor);

	var size = 200, step = 5;
	var yDepth = 0;
	var grid = new THREE.Group();
	var material = new THREE.LineBasicMaterial({
		color: 0x00D1FF,
		linewidth: 0.3,
		fog: true
	});

	for (var i = -size; i <= size; i += step) {
		var verticalGeometry = new THREE.Geometry();
		verticalGeometry.vertices.push(new THREE.Vector3(-i, yDepth, size));
		verticalGeometry.vertices.push(new THREE.Vector3(-i, yDepth, -size));
		var line = new THREE.LineSegments( verticalGeometry, material);
		grid.add(line);
	}

	for (var j = -size; j <= size; j += step) {
		var horizontalGeometry = new THREE.Geometry();
		horizontalGeometry.vertices.push(new THREE.Vector3(size, yDepth, -j));
		horizontalGeometry.vertices.push(new THREE.Vector3(-size, yDepth, -j));
		var line = new THREE.LineSegments( horizontalGeometry, material);
		grid.add(line);
	}
	glScene.add(grid);

	// CREATE THE GLRENDERER AND APPEND IT ON TOP OF HTML
	// OR THE CSSRENDERER
	glRenderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
	});
	glRenderer.setSize(WIDTH, HEIGHT);
	glRenderer.setPixelRatio(window.devicePixelRatio);
	glRenderer.setClearColor(0x000000, 1);
	glRenderer.shadowMap.enabled = true;
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
	TWEEN.update();
	animate();
}

function animate () {
	spotLight.target = marker;
}
