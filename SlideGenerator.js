
// ---------------------- GENERATE SLIDES --------------------- //


// Get all slides from html
function getSlides() {
	var slides = document.getElementsByClassName('slide');
	console.log('got:', slides)
	return slides;
}



// Add a single slide
function addOneSlide(slideArray, index, coords) {
	var slide, slidePlane, slidePlaneGeometry, slidePlaneMaterial;

	var div, text, cssObj;

	// Construct Transparent Plane For Slide to Lay On
	slidePlaneGeometry = new THREE.PlaneGeometry(1600,760);
	slidePlaneMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		opacity: 0,
		side: THREE.DoubleSide,
		blending: THREE.NoBlending
	});
	slidePlane = new THREE.Mesh(slidePlaneGeometry, slidePlaneMaterial);
	slidePlane.position.set(coords[0], coords[1], coords[2]);
	glScene.add(slidePlane);

	slide = slideArray[index];
	console.log('AddOneSlide:',slide)
	cssObj = new THREE.CSS3DObject(slide);
	cssObj.position.set(coords[0], coords[1], coords[2]);
	cssScene.add(cssObj);
}



// Add all slides in html
function addAllSlides(slideArray, coordsArray){

	var slide, slidePlane, slidePlaneGeometry, slidePlaneMaterial;

	var cssObj;

	if(slideArray.length === coordsArray.length) {


		for(var i = 0; i < slideArray.length; i++) {

			var title = slideArray[i].childNodes[1].children[0].innerText;
			var titleComment = slideArray[i].childNodes[1].children[1].innerText;
			var section2 = slideArray[i].childNodes[3].children[0].innerText

			var group = new THREE.Object3D();

			console.log(slideArray[i], coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);

			var slideGeo = new THREE.TextGeometry( title , {
				size: 200,
				height: 50,
				// weight: normal,
				bevelThickness: 50,
				curveSegments: 12,
				font: 'helvetiker'
			});

			slideGeo.computeBoundingBox();
			slideGeo.boundingBox.max.x = 760;
			slideGeo.boundingBox.max.y = 1600;

			var slideMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			var slideMesh = new THREE.Mesh(slideGeo, slideMaterial);

			slideMesh.position.set( coordsArray[i][0], coordsArray[i][1], coordsArray[i][2] );

			group.add(slideMesh);

			glScene.add(group);
			// group.setSize(1600, 750);


			// slidePlaneGeometry = new THREE.PlaneGeometry(1600,760);
			// slidePlaneMaterial = new THREE.MeshBasicMaterial({
			// 	color: 0x000000,
			// 	opacity: 0.5,
			// 	side: THREE.DoubleSide,
			// 	blending: THREE.NoBlending
			// });
			// slidePlane = new THREE.Mesh(slidePlaneGeometry, slidePlaneMaterial);
			// console.log(slidePlane);
			// slidePlane.position.set(coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);
			// slidePlane.add(slideMesh);
			// glScene.add(slidePlane);

			// slide = slideArray[i];
			// cssObj = new THREE.CSS3DObject(slide);
			// cssObj.position.set(coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);
			// cssScene.add(cssObj);


		}
	}
}