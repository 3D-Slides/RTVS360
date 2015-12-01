var glScene, glRenderer;
var box, plane, olsenPlane, fantasyPlane, lionPlane, mainPlane;
var pivot;

var cssScene, cssRenderer;
var threeDOM, threeDOM2, threeDOM3, threeDOM4;

var camera, controls;

var cameraPivot;

var loader;

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
	

	camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 10000);
	camera.position.set (0, 0, 500);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	//AXIS HELPER
	// var axisHelper = new THREE.AxisHelper(1100);
	// glScene.add( axisHelper );

	loader = new THREE.TextureLoader();


	// CONTRUCTING A BOX FOR WEBGL RENDERER
	var boxGeometry = new THREE.BoxGeometry(10,10,10);
	var boxMaterial = new THREE.MeshLambertMaterial({
		// wireframe: true,
		color: 0x000000,
		opacity: 0

	});
	box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.position.set(0, 0, 0);
	glScene.add(box);

	// CREATE THE PIVOT SO CAMERA MOVES AROUND BOX
	cameraPivot = new THREE.Object3D();
	box.add(cameraPivot);
	cameraPivot.add( camera );


	//CONSTRUCT CABIN SPHERE
	loader.load('./assets/2294472375_24a3b8ef46_o.jpg', function ( texture ) {
		var mainPlaneGeometry = new THREE.SphereGeometry(3000, 50, 50);
		var mainPlaneMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		});
		mainPlaneGeometry.scale(-1,1,1)
		mainPlane = new THREE.Mesh(mainPlaneGeometry, mainPlaneMaterial);
		glScene.add( mainPlane );
		mainPlane.position.set(0,0, 0);

		// mainPlane.rotation.x = Math.PI/2;
	})




				 // CREATE OPAQUE PLANES FOR ELEMENTS
/*_____________________________________________________________________*/

	// CONTRUCT A plane TO SHOW CLEAR IN THE BACKGROUND
	var planeGeometry = new THREE.PlaneGeometry(400, 250);
	var planeMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		opacity: 0,
		side: THREE.DoubleSide,
		blending: THREE.NoBlending
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	glScene.add(plane);
	plane.position.set(0,0,300);

	var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
	glScene.add(light);

	//CONSTRUCT ANOTHER PLANE FOR OLSEN PICTURE
	var olsenGeometry = new THREE.PlaneGeometry(400,250);
	var olsenMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		opacity: 0,
		side: THREE.DoubleSide,
		blending: THREE.NoBlending
	});

	olsenPlane = new THREE.Mesh(olsenGeometry, olsenMaterial);
	glScene.add( olsenPlane );
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
	glScene.add( fantasyPlane );
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
	glScene.add( lionPlane );
	lionPlane.position.set( -300,0,0 );
	lionPlane.rotation.y = Math.PI/2;

/*_____________________________________________________________________*/




							// CSS ELEMENTS
/*_____________________________________________________________________*/

	var img = document.createElement('img');
	img.className = 'slide';
	img.src = "http://www.pageresource.com/wallpapers/wallpaper/cool-cat.jpg";
	threeDOM = new THREE.CSS3DObject(img);
	cssScene.add(threeDOM);
	threeDOM.position.set(0,0,300);

	var img2 = document.createElement('img');
	img2.className = 'slide';
	img2.src = 'http://www.pageresource.com/wallpapers/wallpaper/olsen-twins-hot_200056.jpg';
	threeDOM2 = new THREE.CSS3DObject(img2);
	cssScene.add(threeDOM2);
	threeDOM2.position.set(0,0,-300);

	var img3 = document.createElement('img');
	img3.className = 'slide';
	img3.src = 'http://www.pageresource.com/wallpapers/wallpaper/final-fantasy-vii-anime-cloud-strife-sephiroth_358135.jpg';
	threeDOM3 = new THREE.CSS3DObject(img3);
	cssScene.add(threeDOM3);
	threeDOM3.position.set(300,0,0);
	threeDOM3.rotation.y = Math.PI/2;

	var img4 = document.createElement('img');
	img4.className = 'slide';
	img4.src = 'http://www.pageresource.com/wallpapers/wallpaper/lion-noir-blanc-fond-cran_608217.jpg';
	threeDOM4 = new THREE.CSS3DObject(img4);
	cssScene.add(threeDOM4);
	threeDOM4.position.set(-300,0,0);
	threeDOM4.rotation.y = Math.PI/2;
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

	camera.lookAt( glScene.position )
	animate();
}
var zAxis = 0;
function animate () {

	// zAxis += 0.01;

	// threeDOM.rotation.y = zAxis;
	// plane.rotation.y = threeDOM.rotation.y;

	// threeDOM.position.z = Math.sin(zAxis) * 400;
	// plane.position.z = threeDOM.position.z;
}

// ROTATE THE CAMERA AROUND THE BOX
function rotateBox(e) {
	var TIME = 500;
	var RADIANS = Math.PI / 2;
	var key = e.keyIdentifier;
	var rotationCache = {
		x: cameraPivot.rotation.x,
		y: cameraPivot.rotation.y
	};

	// console.log(e);

	createjs.Ticker.setFPS(60);
	var motion = createjs.Tween.get(cameraPivot.rotation);
		
	if(cameraPivot.rotation.x % RADIANS !== 0) {
		if(key === 'Up') {
			cameraPivot.rotation.x = rotationCache.x - RADIANS;
			console.log('up auto');
		}
		if(key === 'Down') {
			cameraPivot.rotation.x = rotationCache.x + RADIANS;
			console.log('down auto');
		}
	}

	if(cameraPivot.rotation.y % RADIANS === 0 && cameraPivot.rotation.x % RADIANS === 0) {
		if(key === 'Right') {
			motion.to({y: cameraPivot.rotation.y + RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('right');
		}
		if(key === 'Left') {
			motion.to({y: cameraPivot.rotation.y - RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('left');
		}
		if(key === 'Up') {
			motion.to({x: cameraPivot.rotation.x - RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('up');
		}
		if(key === 'Down') {
			motion.to({x: cameraPivot.rotation.x + RADIANS}, TIME, createjs.Ease.getBackOut(2));
			console.log('down');
		}
	}

	// if(cameraPivot.rotation.y % RADIANS !== 0) {

	// 	if(key === 'Right') {
	// 		cameraPivot.rotation.y = rotationCache.y + RADIANS;
	// 	createjs.Tween.removeAllTweens();

	// 		console.log('right auto');
	// 	}
	// 	if(key === 'Left') {
	// 		cameraPivot.rotation.y = rotationCache.y - RADIANS;
	// 		console.log('left auto');
	// 	}
		
	// } 
}


