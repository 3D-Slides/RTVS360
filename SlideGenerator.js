
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

	var nodes;

	// Grab all the HTML: 
	var elements = slideArray[index].children;
	console.log('elements:', elements);

	var group = new THREE.Object3D();
	group.position.set(coords[0]-1000,coords[1],coords[2]);

	var coordsArr = [group.position.x, group.position.y, group.position.z]


	for(var k = 0; k < elements.length; k++){

		nodes = elements[k].children;

		console.log('elements[k]:',elements[k])


		for (var j = 0; j < nodes.length; j++){
			console.log('nodes:', nodes[j]);
			var text = nodes[j].innerText;

			if(nodes[j].localName ==='h1'){

				var slideGeo = new THREE.TextGeometry(text, {
					size: 350,
					height: 5,
					curveSegments: 12,
					font: 'helvetiker'
				})

				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

				// textArr.push(nodes[j].innerText);
				// elementArr.push(nodes[j].localName);

			} else if (nodes[j].localName ==='h2'){

				var slideGeo = new THREE.TextGeometry(text, {
					size: 280,
					height: 5,
					curveSegments: 12,
					font: 'helvetiker'
				})

				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );
				// textArr.push(nodes[j].innerText);
				// elementArr.push(nodes[j].localName);

			} else if (nodes[j].localName ==='h3'){

				var slideGeo = new THREE.TextGeometry('* '+text, {
					size: 250,
					height: 5,
					curveSegments: 12,
					font: 'helvetiker'
				})

				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );
				// textArr.push(nodes[j].innerText);
				// elementArr.push(nodes[j].localName);

			 }
			  else if (nodes[j].localName ==='p'){
				
				var slideGeo = new THREE.TextGeometry('     - '+text, {
					size: 200,
					height: 5,
					curveSegments: 12,
					font: 'helvetiker'
				})

				var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xB8F2FF, specular: 0xffffff} );

				// textArr.push(nodes[j].innerText);
				// elementArr.push(nodes[j].localName);
			}

			var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
			slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );

			coordsArr = [coordsArr[0], coordsArr[1]-500, coordsArr[2]];

			group.add(slideMesh);
		}
		
	}

	//set initial position for each line
	// Create 
	// for (var i = 0; i < textArr.length; i++) {
	// 	if(elementArr[i] === "h1"){
	// 		var slideGeo = new THREE.TextGeometry(textArr[i], {
	// 			size: 350,
	// 			height: 5,
	// 			curveSegments: 12,
	// 			font: 'helvetiker'
	// 		})
	// 		var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

	// 	} else if (elementArr[i] === "h2") {
			// var slideGeo = new THREE.TextGeometry(textArr[i], {
			// 	size: 280,
			// 	height: 5,
			// 	curveSegments: 12,
			// 	font: 'helvetiker'
			// })
			// var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );

	// 	} else if (elementArr[i] === "h3") {
			// var slideGeo = new THREE.TextGeometry('* '+textArr[i], {
			// 	size: 250,
			// 	height: 5,
			// 	curveSegments: 12,
			// 	font: 'helvetiker'
			// })
			// var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0xffffff} );

	// 	} else if (elementArr[i] === "p") {
			// var slideGeo = new THREE.TextGeometry('     - '+textArr[i], {
			// 	size: 200,
			// 	height: 5,
			// 	curveSegments: 12,
			// 	font: 'helvetiker'
			// })
			// var slideMaterial = new THREE.MeshPhongMaterial( {color: 0xB8F2FF, specular: 0xffffff} );

	// 	}
	
	// 	var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
	// 	slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );

	// 	coordsArr = [coordsArr[0], coordsArr[1]-500, coordsArr[2]];

	// 	group.add(slideMesh);
	// }

	console.log(group);
	glScene.add(group);
}

// Add all slides in html
SlideGenerator3D.prototype.addAllSlides = function (slideArray, coordsArray) {

	if(slideArray.length === coordsArray.length) {

		for(var i = 0; i < slideArray.length; i++) {

			var title = slideArray[i].childNodes[1].children[0].innerText;
			var titleComment = slideArray[i].childNodes[1].children[1].innerText;
			var section2 = slideArray[i].childNodes[3].children[0].innerText

			// var group = new THREE.Object3D();

			console.log(slideArray[i], coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);

			var slideGeo = new THREE.TextGeometry( title , {
				size: 200,
				height: 50,
				// weight: normal,
				bevelThickness: 50,
				curveSegments: 12,
				font: 'helvetiker'
			});

			// slideGeo.computeBoundingBox();
			// slideGeo.boundingBox.max.x = 760;
			// slideGeo.boundingBox.max.y = 1600;

			var slideMaterial = new THREE.MeshPhongMaterial( { color: 0x00d1ff, specular: 0xffffff } );

			var slideMesh = new THREE.Mesh(slideGeo, slideMaterial);

			slideMesh.position.set( coordsArray[i][0], coordsArray[i][1], coordsArray[i][2] );

			// group.add(slideMesh);

			glScene.add(slideMesh);
			// group.setSize(1600, 750);
		}
	}
}