var spaceUrls = ['images/nebula-xpos.png',
	'images/nebula-xneg.png',
	'images/nebula-ypos.png',
	'images/nebula-yneg.png',
	'images/nebula-zpos.png',
	'images/nebula-zneg.png'];

var camera, controls, glScene, glRenderer, item;
var cssScene, cssRenderer, element, object, mesh;
var earth, sunSphere, ring, plane;
var pivot, pivot2;
var spotLight, ambientLight, sHelper;

init();
animate();


function init () {
	/****************************************************************

					Define Camera, Scene, and Renderer

	****************************************************************/
	glScene = new THREE.Scene();

	cssScene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 55000 );
	camera.position.set(0, 300, 1500);
	camera.lookAt(new THREE.Vector3(0, 300, 0));

	// construct our glRenderer but does not call it


	// construct cssRenderer

	glRenderer = new THREE.WebGLRenderer({
		antialias: true
	});
	glRenderer.setSize( window.innerWidth, window.innerHeight );
	glRenderer.shadowMap.enabled = true;
	glRenderer.setPixelRatio(window.devicePixelRatio);
	glRenderer.domElement.zIndex = 1;
	glRenderer.domElement.position = 'absolute';
	glRenderer.domElement.top = 0;
	document.body.appendChild( glRenderer.domElement );


	cssRenderer = new THREE.CSS3DRenderer();
	cssRenderer.setSize(window.innerWidth, window.innerHeight);
	cssRenderer.domElement.style.position = "absolute";
	cssRenderer.domElement.style.zIndex = 0;
	cssRenderer.domElement.style.top = 0;
	document.body.appendChild( cssRenderer.domElement );
	
	// cssRenderer.domElement.appendChild(glRenderer.domElement);

	// Orbit Controls
	// controls = new THREE.OrbitControls(camera, cssRenderer.domElement);
	controls = new THREE.TrackballControls(camera, glRenderer.domElement);
	controls.maxDistance = 20000;
	controls.minDistance = 50;

	// Show the axis
	var axis = new THREE.AxisHelper(600);
	//glScene.add(axis);
	
	// For textures
	var loader = new THREE.TextureLoader();
	/****************************************************************

							Adding Spheres

	****************************************************************/
	// defining properties of an object in our glScene MeshLambert reacts to light so we will need a light source

	// Pivots
	pivot = new THREE.Object3D();
	pivot2 = new THREE.Group();
	glScene.add(pivot);
	glScene.add(pivot2);
	
	// THE EARTH
	loader.load("images/earth-day.jpg", function (t) {
		var earthGeometry = new THREE.SphereGeometry(160, 32, 32);
		var earthMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			map: t
		});
		earth = new THREE.Mesh(earthGeometry, earthMaterial);
		pivot2.add(earth);

		pivot2.children.forEach(function(o){
			o.position.set(0, 350, 0);
			o.castShadow = true;
			o.receiveShadow = true;
		});
	});

	// THE SUN
	loader.load("images/lava.jpg", function (t) {
		var sunGeometry = new THREE.SphereGeometry(1000, 32, 32);
		var sunMaterial = new THREE.MeshBasicMaterial({
			map: t
		});
		sunSphere = new THREE.Mesh(sunGeometry, sunMaterial);
		sunSphere.position.set(3000, 5000, 3000);
		pivot.add(sunSphere);

	});

	/****************************************************************
		
								Adding a ring

	****************************************************************/

	var CustomSinCurve = THREE.Curve.create(
		function ( scale ) { //custom curve constructor
			this.scale = (scale === undefined) ? 1 : scale;
	},

	function ( t ) { //getspot: t is between 0-1
		var tx = Math.cos(2 * Math.PI * t),
		ty = Math.sin( 2 * Math.PI * t ),
		tz = 0;

		return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
		}
	);

	var path = new CustomSinCurve( 250 );

	var ringGeometry = new THREE.TubeGeometry(
		path,  // path
		40,    // segments
		30,    // radius
		400,   // radiusSegments
		true  // closed
	);
	var ringMaterial = new THREE.MeshPhongMaterial({
		color: 0xCC0000,
	});
	ring = new THREE.Mesh( ringGeometry, ringMaterial );
	ring.castShadow = true;
	ring.receiveShadow = true;
	pivot2.add(ring);
	/****************************************************************

							Adding Light

	****************************************************************/

	spotLight = new THREE.SpotLight(0xFFFFFF, 1, 0, 1000000);
	spotLight.castShadow = true;
	spotLight.position.set(1200, 2000, 1200);
	spotLight.angle = Math.PI/2;
	pivot.add(spotLight);

	ambientLight = new THREE.AmbientLight(0x222222);
	glScene.add(ambientLight);

	/****************************************************************

						Adding Texture Box/ Space

	****************************************************************/
	var materials = [];
	for( var i = 0; i < spaceUrls.length; i++) {
		materials.push(new THREE.MeshBasicMaterial({
			fog: false,
			side: THREE.BackSide,
			blending: THREE.NoBlending,
			map: THREE.ImageUtils.loadTexture(spaceUrls[i])
		}));
	}

	var spaceGeometry = new THREE.BoxGeometry(35000, 35000, 35000);
	var spaceMaterial = new THREE.MeshFaceMaterial(materials);
	var space = new THREE.Mesh(spaceGeometry, spaceMaterial);
	//glScene.add(space);

	/****************************************************************

							Adding a platform

	****************************************************************/
	var planeGeometry = new THREE.PlaneGeometry( 7000, 7000 );
	var planeMaterial = new THREE.MeshBasicMaterial({
		color: 0x646480,
		wireframe: false,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.3
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotateX(Math.PI/2);
	plane.position.set(0, -600, 0);
	plane.receiveShadow = true;
	plane.name = "plane";
	//glScene.add(plane);

	/********************************************************************
								Adding HTML
	*********************************************************************/
	var elWidth = 560;
	var elHeight = 315;

	element = document.createElement( 'iframe' );
	element.src = 'https://www.youtube.com/embed/aQd41nbQM-U';

	element.className = 'test';
	element.style.backgroundColor = new THREE.Color( Math.random() * 0xffffff ).getStyle();
	element.style.width = elWidth + 'px';
	element.style.height = elHeight + 'px';

	object = new THREE.CSS3DObject( element );
	object.name = 'color div';
	var x = document.getElementsByTagName('div');
	x = x[1];
	x.appendChild(object.element);
	cssScene.add( object );

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide,
		opacity: 0,
		blending: THREE.NoBlending
	});
	var geometry = new THREE.PlaneGeometry( elWidth, elHeight );
	mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	mesh.position.copy( object.position );
	mesh.rotation.copy( object.rotation );
	mesh.scale.copy( object.scale );
	glScene.add( mesh );




	/********************************************************************
								DAT GUI
	*********************************************************************/
	item = {
		memory: [0, 0, 0],
		size: 1.0,
		rotateX: 0.0,
		rotateY: 0.0,
		rotateZ: 0.0,
		translateX: 0,
		translateY: 0,
		translateZ: 0,
		ringX: 0,
		ringY: 0,
		ringZ: 0,
		stopRotation() {
			if (item.ringX || item.ringY || item.ringZ) {
				item.memory = [item.ringX, item.ringY, item.ringZ];
			}
			item.ringX = 0;
			item.ringY = 0;
			item.ringZ = 0;
		},
		resumeRotation() {
			item.ringX = item.memory[0];
			item.ringY = item.memory[1];
			item.ringZ = item.memory[2];
		}
	};

	var gui = new dat.GUI();
	gui.add(item, 'size', 1, 10).step(0.1);

	var f1 = gui.addFolder('Translate Slides');
	f1.add(item, 'translateX', -3000, 3000).step(1);
	f1.add(item, 'translateY', -3000, 3000).step(1);
	f1.add(item, 'translateZ', -3000, 3000).step(1);

	var f2 = gui.addFolder('Rotate Slides');
	f2.add(item, 'rotateX', 0, 360);
	f2.add(item, 'rotateY', 0, 360);
	f2.add(item, 'rotateZ', 0, 360);

	var f3 = gui.addFolder('test');
	f3.add(item, 'ringX', 0, 100).step(1).listen();
	f3.add(item, 'ringY', 0, 100).step(1).listen();
	f3.add(item, 'ringZ', 0, 100).step(1).listen();
	f3.add(item, 'stopRotation');
	f3.add(item, 'resumeRotation');
	gui.open()

}
// End of init function    


/********************************************************************
							Render function
*********************************************************************/
// we still need a render function
function animate() {
	requestAnimationFrame( animate );
	controls.update();

	render();

	glRenderer.render( glScene, camera );
	cssRenderer.render( cssScene, camera);

}
function render() {
	// ring.rotation.x += item.rotateX/60;
	// ring.rotation.y += item.rotateY/60;
	// ring.rotation.z += item.rotateZ/60;

	pivot2.rotation.x += item.ringX/5000;
	pivot2.rotation.y += item.ringY/5000;
	pivot2.rotation.z += item.ringZ/5000;

	object.position.x = item.translateX;
	object.position.y = item.translateY;
	object.position.z = item.translateZ;

	object.rotation.x = item.rotateX * Math.PI/180;
	object.rotation.y = item.rotateY * Math.PI/180;
	object.rotation.z = item.rotateZ * Math.PI/180;

	object.scale.set(item.size, item.size, 1);

	mesh.position.copy( object.position );
	mesh.rotation.copy( object.rotation );
	mesh.scale.copy( object.scale );

	object.position.copy( mesh.position );
	object.rotation.copy( mesh.rotation );
	object.scale.copy( mesh.scale );

	if (sunSphere) {
		sunSphere.rotation.y += 0.01;
	}
	if (earth) earth.rotation.y += 0.005;
	pivot.rotation.y += 0.001;
}
