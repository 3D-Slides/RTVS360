var glScene, glRenderer;
var box, plane, slidePlane, floor, olsenPlane, fantasyPlane, lionPlane, mainPlane, marker;
var cssScene, cssRenderer, cssMeshes, cssObj, imgPlane;
var camera, controls, spotLight;
var cameraPivot;
var manager;

var counter = 0;
var colors = JSON.parse(localStorage.colors);
var SlideGenerator = new SlideGenerator(localStorage.input, colors);
var loader = new THREE.TextureLoader();

if (localStorage.world === "Ocean Sunset") {
	var imagePrefix = '/assets/DarkSea-',
	images = ['xneg', 'xpos', 'ypos', 'yneg', 'zneg', 'zpos'],
	imageSuffix = '.jpg',
	imageUrls = images.map(function(img) {
		return imagePrefix + img + imageSuffix;
	});
	var glScene, camera, mirrorCamera, glRenderer, controls, clock;
	var water, waterTexture, waveNormal, waveSpecular;

	initOceanScene();
	renderOceanScene();
} else {
	initTronScene(colors.h1);
	renderTronScene();
}
SlideGenerator.addAllSlides3D( [-160, 25, -50], SlideGenerator.data );

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	ASPECT = window.innerWidth / window.innerHeight;

	camera.aspect = ASPECT;
	camera.updateProjectionMatrix();

	glRenderer.setSize( WIDTH, HEIGHT );

}

function initTronScene(gridColor) {
						// INIT SCENE PROCEDURES
/*_____________________________________________________________________*/
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;

	glScene = new THREE.Scene();
	glScene.fog = new THREE.FogExp2(0x000000, 0.015);
	cssScene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 20000);
	camera.position.set(-135, 30, 0);
	glScene.add(camera);

	spotLight = new THREE.SpotLight(0xffffff, 2.2, 1000, Math.PI/10.5, 0.001);
	spotLight.castShadow = true;
	spotLight.position.set(52, 75, 50);
	spotLight.shadowMapWidth = 1024;
	spotLight.shadowMapHeight = 1024;
	spotLight.shadowCameraNear = 1;
	spotLight.shadowCameraFar = 1000;
	glScene.add(camera);

					// CREATE OPAQUE PLANES FOR ELEMENTS
/*_____________________________________________________________________*/
	marker = new THREE.Object3D();
	marker.position.set(0,0,0);
	marker.add(spotLight);
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
		color: gridColor,
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
	controls.maxDistance = 300;
	controls.minDistance = 15;
	controls.zoomSpeed = 0.8;
	controls.maxPolarAngle = 1.6;
	controls.target = new THREE.Vector3(-135, 10, -50);
}

function renderTronScene() {
	requestAnimationFrame(renderTronScene);
	controls.update();
	glRenderer.render(glScene, camera);
	cssRenderer.render(cssScene, camera);
	TWEEN.update();
	animateTronScene();
}

function animateTronScene () {
	spotLight.target = marker;
}







//************************************************************************//
//                             Ocean Scene                                //
//************************************************************************//









function initOceanScene() {
	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;
	clock = new THREE.Clock();
	glScene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 20000);
	camera.position.set(-135, 30, 0);

	// mirrorCamera = new THREE.CubeCamera(1, 10000, 1024);
	// mirrorCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
	// glScene.add(mirrorCamera);
	// var axisHelper = new THREE.AxisHelper( 40 );
	// glScene.add( axisHelper );

	var ambientLight = new THREE.AmbientLight(0xFFFFFF);
	glScene.add(ambientLight);

	var directionLight = new THREE.DirectionalLight(0xFC7825);
	directionLight.position.set(300, 150, -500);
	glScene.add(directionLight);

	marker = new THREE.Object3D();
	marker.position.set(0,0,0);
	glScene.add(marker);

	// SKYBOX
	var skyBoxTextures = THREE.ImageUtils.loadTextureCube( imageUrls );
	skyBoxTextures.format = THREE.RGBFormat;

	var shader = THREE.ShaderLib.cube;
	shader.uniforms.tCube.value = skyBoxTextures;

	var skyBoxGeometry = new THREE.BoxGeometry(8000, 8000, 8000);
	var skyBoxMaterial = new THREE.ShaderMaterial({
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});

	var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
	skyBox.rotation.x = Math.PI/2;
	glScene.add(skyBox);


	// WATER
	waterTexture = THREE.ImageUtils.loadTexture('assets/water512.jpg');
	waterTexture.crossOrigin = 'anonymous';
	waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
	waterTexture.repeat.set(128,128);

	waveNormal = THREE.ImageUtils.loadTexture('/assets/water-normal-2.png');
	waveNormal.wrapS = waveNormal.wrapT = THREE.RepeatWrapping;
	waveNormal.repeat.set(512,512);

	var waterGeometry = new THREE.PlaneGeometry(8000, 8000, 100, 100);
	var waterMaterial = new THREE.MeshPhongMaterial({
		color: '#5A6CA0',
		map: waterTexture,
		combine: THREE.MixOperation,
		normalMap: waveNormal,
		reflectivity:0.92,
		// envMap: mirrorCamera.renderTarget,
		envMap: skyBoxTextures,
		shininess: 5,
		opacity: 1
	});
	water = new THREE.Mesh( waterGeometry, waterMaterial);
	water.rotation.x = Math.PI/2;
	water.rotation.y = Math.PI;
	glScene.add(water);

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

	controls = new THREE.OrbitControls(camera, glRenderer.domElement);
	controls.maxDistance = 300;
	controls.minDistance = 15;
	controls.zoomSpeed = 0.8;
	controls.maxPolarAngle = 1.6;
	controls.target = new THREE.Vector3(-135, 15, -50);

}

function renderOceanScene() {
	requestAnimationFrame(renderOceanScene);
	controls.update();
	animateOceanScene();
	glRenderer.render(glScene, camera);
	TWEEN.update();
}

function animateOceanScene () {
	var delta = clock.getDelta();
	var time = clock.getElapsedTime();
	waterTexture.offset.set(0, time/80);
	// water.visible = false;
	// mirrorCamera.updateCubeMap(glRenderer, glScene);
	// water.visible = true;
}