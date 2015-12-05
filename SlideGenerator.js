
// ---------------------- GENERATE SLIDES --------------------- //

function SlideGenerator3D (){

}
// Get all slides from html

SlideGenerator3D.prototype.getSlides = function () {
	var slides = document.getElementsByClassName('slide');
	console.log('got:', slides)
	return slides;
}

// Add a single slide
SlideGenerator3D.prototype.addOneSlide = function (slideArray, index, coords) {
	
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

// Add all slides in html
SlideGenerator3D.prototype.addAllSlides = function (slideArray, coordsArray) {

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