var spaceUrls = ['assets/nebula-xpos.png',
	'assets/nebula-xneg.png',
	'assets/nebula-ypos.png',
	'assets/nebula-yneg.png',
	'assets/nebula-zpos.png',
	'assets/nebula-zneg.png'];

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
glScene.add(space);