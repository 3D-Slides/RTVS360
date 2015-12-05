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
SlideGenerator.addAllSlides3D( slidesArray, slidesPositions );
SlideGenerator.addAllSlides(slidesArray, TwoDPositions);
//:::::::::::::::::::

function init() {

	var axisHelper = new THREE.AxisHelper(10000);


	var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight,
		ASPECT = WIDTH / HEIGHT;

	glScene = new THREE.Scene();
	cssScene = new THREE.Scene();
	glScene.add(axisHelper);

	// AXIS HELPER
	// var axisHelper = new THREE.AxisHelper(1100);
	// glScene.add( axisHelper );

	loader = new THREE.TextureLoader();

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 60000);
	camera.position.set (0, 1500, 20000);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

					// CREATE OPAQUE PLANES FOR ELEMENTS
/*_____________________________________________________________________*/

	// CONTRUCT A plane TO SHOW CLEAR IN THE BACKGROUND
	// var slidePlaneGeometry = new THREE.PlaneGeometry(1600, 760);
	// var slidePlaneMaterial = new THREE.MeshBasicMaterial({
	// 	color: 0x000000,
	// 	opacity: 0,
	// 	side: THREE.DoubleSide,
	// 	blending: THREE.NoBlending
	// });
	// slidePlane = new THREE.Mesh(slidePlaneGeometry, slidePlaneMaterial);
	// glScene.add(slidePlane);
	// slidePlane.position.set(0,0,300);


	// CONSTRUCT A FLOOR
	var floorGeometry = new THREE.PlaneGeometry(40000, 42000);
	var floorMaterial = new THREE.MeshLambertMaterial({
		color: 0xd3d3d3,
		// wireframe: true,
		// wireframeLineWidth: 5,
		side: THREE.DoubleSide
	});
	floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI/2;
	// floor.position.set(0, -450, -1000);
	floor.position.set(0, -100, -1000);
	glScene.add(floor);

	// var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
	// glScene.add(light);

	var size = 20000, step = 2000;
	var yDepth = 0;
	var grid = new THREE.Group();
	var material = new THREE.LineBasicMaterial({
		// color: 0x01D5DA,
		color: 0x00D1FF,
		linewidth: 1
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


							// CSS ELEMENTS
/*_____________________________________________________________________*/
	// var slides = document.getElementsByClassName('reveal')[0];
	// // console.log(slides);
	// threeDOM = new THREE.CSS3DObject(slides);
	// threeDOM.name = "CSS SLIDES";
	// threeDOM.position.set(0,0,300);
	// cssScene.add(threeDOM);
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

	window.addEventListener( 'resize', onWindowResize, false );
// create window resize function
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

	// slidePlane.position.x = item.translateX;
	// slidePlane.position.y = item.translateY;
	// slidePlane.position.z = item.translateZ;
	//
	// slidePlane.rotation.x = item.rotateX * Math.PI/180;
	// slidePlane.rotation.y = item.rotateY * Math.PI/180;
	// slidePlane.rotation.z = item.rotateZ * Math.PI/180;
	//
	// slidePlane.scale.set(item.size, item.size, 1);
	//
	// threeDOM.position.copy(slidePlane.position);
	// threeDOM.rotation.copy(slidePlane.rotation);
	// threeDOM.scale.copy(slidePlane.scale);

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
