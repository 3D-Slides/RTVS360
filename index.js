var glScene, glRenderer;
var box, plane, slidePlane, floor, olsenPlane, fantasyPlane, lionPlane, mainPlane, marker;
var cssScene, cssRenderer, cssMeshes;
var camera, controls, spotLight;
var cameraPivot;
var loader;


var counter = 0;
var SlideGenerator = new SlideGenerator();

	// var slidesArray = SlideGenerator.getSlides();
init();
SlideGenerator.addAllSlides3D( [-160, 25, -50], SlideGenerator.data );
render();



//:::::::::::::::::::


function init() {
						// INIT SCENE PROCEDURES
/*_____________________________________________________________________*/
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;

	glScene = new THREE.Scene();
	glScene.fog = new THREE.FogExp2(0x000000, 0.015);
	cssScene = new THREE.Scene();
	loader = new THREE.ImageLoader();
	loader.setCrossOrigin = "anonymous";


	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 20000);
	camera.position.set(0, 5, 0);
	glScene.add(camera);

	spotLight = new THREE.SpotLight(0xffffff, 2.2, 1000, Math.PI/3, 0.001);
	spotLight.position.copy( camera.position );
	spotLight.position.z = 10;
	spotLight.position.y = 45;
	spotLight.position.x = 50;
	spotLight.castShadow = true;
	spotLight.shadowMapWidth = 1024;
	spotLight.shadowMapHeight = 1024;
	spotLight.shadowCameraNear = 1;
	spotLight.shadowCameraFar = 1000;
	camera.add(spotLight);

	glScene.add(camera);
	

	loader = new THREE.TextureLoader();


					// CREATE OPAQUE PLANES FOR ELEMENTS
/*_____________________________________________________________________*/
	marker = new THREE.Object3D();
	marker.position.set(0,0,0);
	glScene.add(marker);

	// CONSTRUCT A FLOOR

	var floorGeometry = new THREE.PlaneGeometry(450,450,90,90);
	var floorMaterial = new THREE.MeshPhongMaterial({
		color: 0x1F1E24,
		side: THREE.DoubleSide
	});
	floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI/2;
	floor.position.set(0, -0.03, 0);
	floor.receiveShadow = true;
	glScene.add(floor);

	var size = 225, step = 5;
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

	controls = new THREE.OrbitControls(camera, glRenderer.domElement);
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
