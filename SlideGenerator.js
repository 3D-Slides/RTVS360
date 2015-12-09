// ---------------------- GENERATE SLIDES --------------------- //

function SlideGenerator (){

}

// Get all slides from html:
SlideGenerator.prototype.getSlides = function () {
	var slides = document.getElementsByClassName('slide');
	return slides;
};

// Add a single 3d slide:
SlideGenerator.prototype.addOneSlide3D = function (slideArray, index, coords) {

	// helper function for TextGeometry Props
	function generateProps(size){
		return {
			size: size/100,
			height: 0.1,
			curveSegments: 12,
			font: 'helvetiker'
		};
	}

	function setMesh( geo, material ) {
		var slideMesh = new THREE.Mesh( geo, material );
		slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );
		coordsArr = [coordsArr[0], coordsArr[1]-500, coordsArr[2]];
		group.add(slideMesh);
	}
	

	var group = new THREE.Object3D();
	group.position.set(coords[0],coords[1],coords[2]);
	var coordsArr = [group.position.x, group.position.y, group.position.z];
	var elements = slideArray[index].children;

	// Loop thru all the elements, grabbing each node
	for(var k = 0; k < elements.length; k++){
		var nodes = elements[k].children;
		// Loop thru nodes, creating the slides
		for (var j = 0; j < nodes.length; j++){
			var text = nodes[j].innerText;

			if(nodes[j].localName ==='h1'){
				var slideGeo = new THREE.TextGeometry(text, generateProps(350));
				var slideMaterial = new THREE.MeshLambertMaterial( {color: 0x00d1ff} );
				setMesh( slideGeo, slideMaterial );
			} else if (nodes[j].localName ==='h2') {
				var slideGeo = new THREE.TextGeometry(text, generateProps(280));
				var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
				setMesh( slideGeo, slideMaterial );
			} else if (nodes[j].localName ==='h3') {
				var slideGeo = new THREE.TextGeometry('* ' +text, generateProps(250));
				var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
				setMesh( slideGeo, slideMaterial );
			} else if (nodes[j].localName ==='p') {
				var slideGeo = new THREE.TextGeometry('     - ' +text, generateProps(200));
				var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );
				setMesh( slideGeo, slideMaterial );
			} else if (nodes[j].localName ==='span') {
				var slideGeo = new THREE.TextGeometry('            ' +text, generateProps(200));
				var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );
				setMesh( slideGeo, slideMaterial );
			} else if (nodes[j].localName === 'ul'){
				var liElements = nodes[j].children;
				for (var h = 0; h < liElements.length; h++) {
					var liText = liElements[h].innerText;
					var slideGeo = new THREE.TextGeometry('            > ' +liText, generateProps(100));
					var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );
					setMesh( slideGeo, slideMaterial );
				}
			} else {
				console.error('Some of yout HTML is not rendering! Please enter valid HTML elements in your slide format (h1, h2, h3, p, span)')
			}
		}
	}
	glScene.add(group);
};

// Add all 3d slides in html:
SlideGenerator.prototype.addAllSlides3D = function (slideArray, coordsArray) {
	
	var firstHalf, secondHalf;
	var loader = new THREE.TextureLoader();
	
		// helper func to get textGeo props:
	function generateProps(size){
		return {
			size: size/100,
			height: 0.2,
			curveSegments: 12,
			font: 'helvetiker'
		}
	}
		// helper to create mesh text shapes
	function setMesh( geo, material ) {
			//create the text shapes:
		var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
		slideMesh.castShadow = true;
		slideMesh.receiveShadow = true;
		// slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );

			// Offset each line so they dont lay ontop of eachother:
			if(nodes[j].src){
				coordsArr = [coordsArr[0], coordsArr[1]-10, coordsArr[2]];	
				slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );
			} else {
				coordsArr = [coordsArr[0], coordsArr[1]-2, coordsArr[2]];	
				slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );
			}
		group.add(slideMesh);
		group.castShadow = true;
		group.receiveShadow = true;
	}
		// Check if Slides Array and Coords Array match up:
	if(slideArray.length === coordsArray.length) {

			// Loop Thru Slides, creating group for each:
		for(var i = 0; i < slideArray.length; i++) {

			var group = new THREE.Object3D();
			group.position.set(coordsArray[i][0],coordsArray[i][1],coordsArray[i][2]);
			var coordsArr = [group.position.x, group.position.y, group.position.z]
			var elements = slideArray[i].children;

				// Loop through the elements of eachSlide, finding the nodes:
			for(var k = 0; k < elements.length; k++){
				var nodes = elements[k].children;
				//console.log('nodes:',nodes)

					// Loop thru all the nodes, creating 3d text for each:
				for (var j = 0; j < nodes.length; j++){
					var text = nodes[j].innerText;

					if(nodes[j].localName === 'h1' ) {
						var slideGeo = new THREE.TextGeometry(text, generateProps(175));
						var slideMaterial = new THREE.MeshLambertMaterial( {color: 0x00d1ff} );
						setMesh( slideGeo, slideMaterial );
					} else if (nodes[j].localName === 'h2' ) {
						var slideGeo = new THREE.TextGeometry(text, generateProps(140));
						var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
						setMesh( slideGeo, slideMaterial );
					} else if (nodes[j].localName === 'h3' ) {
						var slideGeo = new THREE.TextGeometry('* ' +text, generateProps(125));
						var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
						setMesh( slideGeo, slideMaterial );
					} else if (nodes[j].localName === 'p' ) {
						var slideGeo = new THREE.TextGeometry('       ' +text, generateProps(100));
						var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );	
						setMesh( slideGeo, slideMaterial );
					} else if (nodes[j].localName === 'pre') {
						var slideGeo = new THREE.TextGeometry('            ' +text, generateProps(100));
						var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );
						setMesh( slideGeo, slideMaterial );
					} else if (nodes[j].localName === 'ul') {	
						var liElements = nodes[j].children;
						for(var h = 0; h < liElements.length; h++) {
							var liText = liElements[h].innerText;
							var slideGeo = new THREE.TextGeometry(' - ' +liText, generateProps(100));
							var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );
							setMesh( slideGeo, slideMaterial );
						}

						// LOAD IMAGES AND MAP ONTO PLANE/SPRITE GEOMETRY
					} else if (nodes[j].localName === 'img') {
						THREE.ImageUtils.crossOrigin = "anonymous";
						var texture = THREE.ImageUtils.loadTexture(nodes[j].src);

						// RENDER SPRITES
						var material = new THREE.SpriteMaterial( {map: texture, color: 0xffffff, fog: true} )
						var sprite = new THREE.Sprite( material )
						sprite.position.set( coordsArr[0]+10, coordsArr[1]-14, coordsArr[2] );
						sprite.scale.set( nodes[j].width/35, nodes[j].height/35, 10 );
						sprite.castShadow = true;
						sprite.receiveShadow = true;
						group.add(sprite)

						// RENDER PLANES INSTEAD OF SPRITES:
						// var slideGeo = new THREE.PlaneGeometry(25,15);
						// var slideMaterial = new THREE.MeshLambertMaterial({
						// 	map: texture,
						// 	side: THREE.DoubleSide
						// });
						// setMesh( slideGeo, slideMaterial );

					} else {
						console.error('Some of yout HTML is not rendering! Please enter valid HTML elements in your slide format (h1, h2, h3, p, ul, li)')
					}
				}
				glScene.add(group);
			}
		}
	} else {
		console.error('Your coords do not match up with your slides!');
	}
};

// Add a single 2d slide:
SlideGenerator.prototype.addOneSlide = function (slideArray, index, coords) {
	
	var slide, slidePlane, slidePlaneGeometry, slidePlaneMaterial;

	var div, text, cssObj;

	// Construct Transparent Plane For Slide to Lay On:
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

	//Create CSS slide that lays under transparent plane:
	slide = slideArray[index];
	cssObj = new THREE.CSS3DObject(slide);
	cssObj.position.set(coords[0], coords[1], coords[2]);
	cssScene.add(cssObj);
};

// Add all 2d slides in html
SlideGenerator.prototype.addAllSlides = function (slideArray, coordsArray) {

	var slide, slidePlane, slidePlaneGeometry, slidePlaneMaterial;

	var cssObj;

	if(slideArray.length === coordsArray.length) {

		// Create transparent plane for each slide:
		for(var i = 0; i < slideArray.length; i++) {

			slidePlaneGeometry = new THREE.PlaneGeometry(1600,760);
			slidePlaneMaterial = new THREE.MeshBasicMaterial({
				color: 0x000000,
				opacity: 0,
				side: THREE.DoubleSide,
				blending: THREE.NoBlending
			});
			slidePlane = new THREE.Mesh(slidePlaneGeometry, slidePlaneMaterial);
			slidePlane.position.set(coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);
			glScene.add(slidePlane);

			// Create CSS object for each slide:
			slide = slideArray[i];
			cssObj = new THREE.CSS3DObject(slide);
			cssObj.position.set(coordsArray[i][0], coordsArray[i][1], coordsArray[i][2]);
			cssScene.add(cssObj);
			
		}
	} else {
		console.error('Your coords do not match up with your slides!');
	}
};


// else {

// // if lines are too long, cut in half to avoid overflow
// var firstHalf, secondHalf, mid;
// 	function cutParagraphs(para) {
// 		mid = Math.floor(para.length/2);
// 		firstHalf = para.slice(0, mid);
// 		secondHalf = para.slice(mid, para.length);
// 	}
// cutParagraphs(text);

// if(firstHalf.length < 100){
// 	console.log('firsthalf:',firstHalf)
// 	var slideGeo = new THREE.TextGeometry('     - ' +firstHalf, generateProps(100));
// 	var slideMaterial = new THREE.MeshLambertMaterial( {color: 0xB8F2FF} );
// } else {
// 	cutParagraphs(firstHalf);
// }

