
// Black Background
// var spaceGeometry = new THREE.CubeGeometry(45000, 45000, 45000);
// var spaceMaterial = new THREE.MeshBasicMaterial({
//   color: 0x000000,
//   side: THREE.BackSide
// });

<<<<<<< HEAD
// var light = new THREE.HemisphereLight(0xffffff, 0x00d1ff, 1);
// glScene.add(light);

// Temp Cube
var cubeGeometry = new THREE.BoxGeometry(2000,2000,2000);
var cubeMaterial = new THREE.MeshPhongMaterial({
	color: 0xffffff
});

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(200, 1500, 16000);
// glScene.add(cube);

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
=======
// var space = new THREE.Mesh(spaceGeometry, spaceMaterial);
//glScene.add(space);
>>>>>>> 60478a564c174018780f74727fb000841acc0543
