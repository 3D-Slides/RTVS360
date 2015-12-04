
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
	// var slide, slidePlane, slidePlaneGeometry, slidePlaneMaterial;

	// var div, text, cssObj;
	var textArr = [];
	var elementArr = [];

	var title = 		 slideArray[index].children[0].children[0].innerText;
	var titleInfo =      slideArray[index].children[0].children[1].innerText;
	var secondaryTitle = slideArray[index].children[1].children[0].innerText;
	var bullet1 = 		 slideArray[index].children[1].children[1].children[0].innerText;
	var bullet2 = 		 slideArray[index].children[1].children[1].children[1].innerText;

	var titleEle = 		    slideArray[index].children[0].children[0].localName;
	var titleInfoEle = 	    slideArray[index].children[0].children[1].localName;
	var secondaryTitleEle = slideArray[index].children[1].children[0].localName;
	var bullet1Ele =   		slideArray[index].children[1].children[1].children[0].localName;
	var bullet2Ele = 			slideArray[index].children[1].children[1].children[1].localName;


	textArr.push(title, titleInfo, secondaryTitle, bullet1, bullet2);
	elementArr.push(titleEle, titleInfoEle, secondaryTitleEle, bullet1Ele, bullet2Ele);
	console.log('slidearray:', textArr)
	console.log('elem:', elementArr[0])

	var group = new THREE.Object3D();
	group.position.set(coords[0],coords[1],coords[2])


	var coordsArr = [group.position.x, group.position.y, group.position.z]
	// console.log( slideArray[index], coords[0], coords[1], coords[2] );

	for (var i = 0; i < textArr.length; i++) {
		if(elementArr[i] === "h1"){
			var slideGeo = new THREE.TextGeometry(textArr[i], {
				size: 350,
				height: 5,
				curveSegments: 12,
				font: 'helvetiker'
			})
			var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

		} else if (elementArr[i] === "h3") {
			var slideGeo = new THREE.TextGeometry(textArr[i], {
				size: 250,
				height: 5,
				curveSegments: 12,
				font: 'helvetiker'
			})
			var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

		} else if (elementArr[i] === "li") {
			var slideGeo = new THREE.TextGeometry(textArr[i], {
				size: 200,
				height: 5,
				curveSegments: 12,
				font: 'helvetiker'
			})
			var slideMaterial = new THREE.MeshPhongMaterial( {color: 0x00d1ff, specular: 0xffffff} );

		}
	
		var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
		slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );

		coordsArr = [coordsArr[0], coordsArr[1]-400, coordsArr[2]];

		group.add(slideMesh);
	}
	console.log(group);
	glScene.add(group);

	// Construct Transparent Plane For Slide to Lay On
	// slidePlaneGeometry = new THREE.PlaneGeometry(1600,760);
	// slidePlaneMaterial = new THREE.MeshBasicMaterial({
	// 	color: 0x000000,
	// 	opacity: 0,
	// 	side: THREE.DoubleSide,
	// 	blending: THREE.NoBlending
	// });
	// slidePlane = new THREE.Mesh(slidePlaneGeometry, slidePlaneMaterial);
	// slidePlane.position.set(coords[0], coords[1], coords[2]);
	// glScene.add(slidePlane);

	// slide = slideArray[index];
	// console.log('AddOneSlide:',slide)
	// cssObj = new THREE.CSS3DObject(slide);
	// cssObj.position.set(coords[0], coords[1], coords[2]);
	// cssScene.add(cssObj);
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