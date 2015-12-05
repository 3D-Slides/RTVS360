
// ---------------------- GENERATE SLIDES --------------------- //

function SlideGenerator (){

}

// Get all slides from html
SlideGenerator.prototype.getSlides = function () {
	var slides = document.getElementsByClassName('slide');
	return slides;
}

// Add a single 3d slide
SlideGenerator.prototype.addOneSlide3D = function (slideArray, index, coords) {
	
	// helper function for TextGeometry Props
	function generateProps(size){
		return {
			size: size,
			height: 8,
			curveSegments: 12,
			font: 'helvetiker'
		}
	}
	
	var group = new THREE.Object3D();
	group.position.set(coords[0]-1000,coords[1],coords[2]);

	var coordsArr = [group.position.x, group.position.y, group.position.z]

	var elements = slideArray[index].children;
	// console.log('elements:', elements);

	for(var k = 0; k < elements.length; k++){

		var nodes = elements[k].children;

		// console.log('elements[k]:',elements[k])

		for (var j = 0; j < nodes.length; j++){
			// console.log('nodes:', nodes[j]);
			var text = nodes[j].innerText;

			if(nodes[j].localName ==='h1'){

				var slideGeo = new THREE.TextGeometry(text, generateProps(350));
				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

			} else if (nodes[j].localName ==='h2'){

				var slideGeo = new THREE.TextGeometry(text, generateProps(280));
				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );

			} else if (nodes[j].localName ==='h3'){

				var slideGeo = new THREE.TextGeometry('* ' +text, generateProps(250));
				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );

			} else if (nodes[j].localName ==='p'){
				
				var slideGeo = new THREE.TextGeometry('     - ' +text, generateProps(200));
				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xB8F2FF, specular: 0xffffff} );

			} else if (nodes[j].localName ==='span'){
				
				var slideGeo = new THREE.TextGeometry('            ' +text, generateProps(200));
				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xB8F2FF, specular: 0xffffff} );

			}

			var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
			slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );

			coordsArr = [coordsArr[0], coordsArr[1]-500, coordsArr[2]];
			group.add(slideMesh);
		}
	}

	console.log(group);
	glScene.add(group);
}

// Add all 3d slides in html
SlideGenerator.prototype.addAllSlides3D = function (slideArray, coordsArray) {

	function generateProps(size){
		return {
			size: size,
			height: 8,
			curveSegments: 12,
			font: 'helvetiker'
		}
	}

	// Check if Slides Array and Coords Array match up
	if(slideArray.length === coordsArray.length) {

		// Loop Thru Slides, creating group for each, offsetting each position
		for(var i = 0; i < slideArray.length; i++) {
			var group = new THREE.Object3D();

			group.position.set(coordsArray[i][0]-2500,coordsArray[i][1],coordsArray[i][2]);

			var coordsArr = [group.position.x, group.position.y, group.position.z]

			var elements = slideArray[i].children;
			// console.log('elements:', elements);

			for(var k = 0; k < elements.length; k++){

				var nodes = elements[k].children;

				// console.log('elements[k]:',elements[k])

				for (var j = 0; j < nodes.length; j++){
					// console.log('nodes:', nodes[j]);
					var text = nodes[j].innerText;

					if(nodes[j].localName ==='h1'){

						var slideGeo = new THREE.TextGeometry(text, generateProps(175));
						var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

					} else if (nodes[j].localName ==='h2'){

						var slideGeo = new THREE.TextGeometry(text, generateProps(140));
						var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );

					} else if (nodes[j].localName ==='h3'){

						var slideGeo = new THREE.TextGeometry('* ' +text, generateProps(125));
						var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );

					} else if (nodes[j].localName ==='p'){
						
						var slideGeo = new THREE.TextGeometry('     - ' +text, generateProps(100));
						var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xB8F2FF, specular: 0xffffff} );

					} else if (nodes[j].localName ==='span'){
						
						var slideGeo = new THREE.TextGeometry('            ' +text, generateProps(100));
						var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xB8F2FF, specular: 0xffffff} );

					} else {
						console.error('Please enter valid HTML elements in your slide format (h1, h2, h3, p, span)')
					}

					var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
					slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );

					coordsArr = [coordsArr[0], coordsArr[1]-250, coordsArr[2]];
					group.add(slideMesh);

				}
				glScene.add(group);
			}
		}
	}
}


// Add a single 2d slide
SlideGenerator.prototype.addOneSlide = function (slideArray, index, coords) {
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
	cssObj.position.set(coords[0], coords[1], coords[2])
	cssScene.add(cssObj);
}



// Add all 2d slides in html
SlideGenerator.prototype.addAllSlides = function (slideArray, coordsArray) {

	var slide, slidePlane, slidePlaneGeometry, slidePlaneMaterial;

	var cssObj;

	if(slideArray.length === coordsArray.length) {


		for(var i = 0; i < slideArray.length; i++) {

		console.log(slideArray[i], coordsArray[i][0], coordsArray[i][1], coordsArray[i][2])


			slidePlaneGeometry = new THREE.PlaneGeometry(1600,760);
			slidePlaneMaterial = new THREE.MeshBasicMaterial({
				color: 0x000000,
				opacity: 0,
				side: THREE.DoubleSide,
				blending: THREE.NoBlending
			});
			slidePlane = new THREE.Mesh(slidePlaneGeometry, slidePlaneMaterial);
			console.log(slidePlane);
			slidePlane.position.set(coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);
			glScene.add(slidePlane);

			slide = slideArray[i];
			cssObj = new THREE.CSS3DObject(slide);
			cssObj.position.set(coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);
			// cssObj.style.padding = 20;
			cssScene.add(cssObj);


		}
	}
}