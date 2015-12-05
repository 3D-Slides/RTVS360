var spaceUrls = ['assets/bottom.jpg',
	'assets/bottom.jpg',
	'assets/bottom.jpg', // top
	'assets/bottom.jpg', // bottom
	'assets/bottom.jpg',
	'assets/bottom.jpg'];


// var light = new THREE.HemisphereLight(0xffffff, 0x00d1ff, 1);
// glScene.add(light);

// Add Directional Light for cube to determine positioning
var lights = new THREE.DirectionalLight(0xffffff, 2, 15000);
lights.position.set(500, 200, 0);
lights.target.position.set(0, 0, -2000);
lights.castShadow = true;
camera.add(lights);
glScene.add(camera);

// Temp Cube
var cubeGeometry = new THREE.BoxGeometry(2000,2000,2000);
var cubeMaterial = new THREE.MeshPhongMaterial({
	color: 0xffffff
});

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(200, 1500, 16000);
glScene.add(cube);

var helper = new THREE.DirectionalLightHelper(lights);
glScene.add(helper);



// add spotlight for a bit of light
//   var spotLight0 = new THREE.SpotLight(0xcccccc);
//   spotLight0.position.set(-4000, 6000, -1000);
//   spotLight0.lookAt(plane);
//   glScene.add(spotLight0);
//
// 	var spotLightHelper = new THREE.SpotLightHelper( spotLight );
// 	glScene.add( spotLightHelper );
//
//   var target = new THREE.Object3D();
//   target.position = new THREE.Vector3(5000, 0, 0);
//
//   var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 20.6);
//   hemiLight.position.set(0, 5000, 0);
//   glScene.add(hemiLight);
//
//   var pointColor = "#ffffff";
//
//
// // var dirLight = new THREE.SpotLight( pointColor);
//   var dirLight = new THREE.DirectionalLight(pointColor);
//   dirLight.position.set(3000, 1000, -5000);
//   dirLight.castShadow = true;
//
//
// // dirLight.shadowCameraNear = 0.1;
// // dirLight.shadowCameraFar = 100;
// // dirLight.shadowCameraFov = 50;
//   dirLight.target = plane;
//   dirLight.shadowCameraNear = 0.1;
//   dirLight.shadowCameraFar = 200;
//   dirLight.shadowCameraLeft = -50;
//   dirLight.shadowCameraRight = 50;
//   dirLight.shadowCameraTop = 50;
//   dirLight.shadowCameraBottom = -50;
//   dirLight.shadowMapWidth = 2048;
//   dirLight.shadowMapHeight = 2048;


var materials = [];
	for( var i = 0; i < spaceUrls.length; i++) {
		materials.push(new THREE.MeshBasicMaterial({
			fog: false,
			side: THREE.BackSide,
			blending: THREE.NoBlending,
			map: THREE.ImageUtils.loadTexture(spaceUrls[i])
		})
	);
}

var spaceGeometry = new THREE.CubeGeometry(45000, 45000, 45000);

var spaceMaterial = new THREE.MeshFaceMaterial(materials);

var space = new THREE.Mesh(spaceGeometry, spaceMaterial);
glScene.add(space);
