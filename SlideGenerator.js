// ---------------------- GENERATE SLIDES --------------------- //

function SlideGenerator (){
	var html = document.cookie.replace(/\\t|\\n+|\s{2,}/g, '');
	// var splitSlides = R.split('<br/>');

	this.data = html;

	console.log("data:", this.data);
}

// Add a single 3d slide:
SlideGenerator.prototype.addOneSlide3D = function (coords, html) {

	var tagStore = [];
	var contentStore = [];

	// split html data at tags
	var divideOnTagName = R.split('<');
	var divideContentAndTag = R.split('>');
	var divideAllContent = R.map(divideContentAndTag);

	// save the broken up html data into array
	var group = new THREE.Object3D();

	// individual properties for each tag
	var tagProps = {
		h1: {
			color: 0x00d1ff,
			size: 1.75,
			indent: ''
		},
		h2: {
			color: 0xffffff,
			size: 1.4,
			indent: ''
		},
		h3: {
			color: 0xffffff,
			size: 1.25,
			indent: '* '
		},
		p: {
			color: 0xB8F2FF,
			size: 1,
			indent: '       '
		},
		li: {
			color: 0xB8F2FF,
			size: 1,
			indent: ' - '
		}
	}

	var posArray = coords;

	// helper function to create 3D Text Mesh
	function makeMesh(tag, content) {
		var props =  tagProps[tag];
		var slideGeo = new THREE.TextGeometry(props.indent +content, {
			size: props.size,
			height: 0.1,
			curveSegments: 12,
			font: 'helvetiker'
		});
		var slideMaterial = new THREE.MeshLambertMaterial( {color: props.color} );
		var slideMesh = new THREE.Mesh( slideGeo, slideMaterial );
		slideMesh.position.set(posArray[0], posArray[1], posArray[2])
		posArray[1]-=4;
		return slideMesh;
	}

	// check if element has /, if it does then pop it into variable then render the content
	var createSlide = R.forEach(function(subArray) {
	  if( R.test(/\//, subArray[0]) ) {
	    var tag = tagStore.pop();
	    var content = contentStore.pop();
	    if(content !== '') {
	      var mesh = makeMesh(tag, content);
	      group.add(mesh);
	    }
	  } else {
	    tagStore.push(subArray[0]);
	    contentStore.push(subArray[1]);
	  }
	});

	var generate3D = R.compose(createSlide, R.tail, divideAllContent, divideOnTagName);
	generate3D(html);
	glScene.add(group);
	
};

// Add all 3d slides in html:
SlideGenerator.prototype.addAllSlides3D = function (coordsArray) {
	
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
				coordsArr = [coordsArr[0], coordsArr[1]-2, coordsArr[2]];	
				slideMesh.position.set( coordsArr[0], coordsArr[1], coordsArr[2] );
			
		group.add(slideMesh);
		group.castShadow = true;
		group.receiveShadow = true;
	}
		// Check if Slides Array and Coords Array match up:
	if(this.slides.length === coordsArray.length) {

			// Loop Thru Slides, creating group for each:
		for(var i = 0; i < this.slides.length; i++) {
			console.log(coordsArr);
			this.addOneSlide3D(i, coordsArr[i]);

			var group = new THREE.Object3D();
			group.position.set(coordsArray[i][0],coordsArray[i][1],coordsArray[i][2]);
			var coordsArr = [group.position.x, group.position.y, group.position.z]
			var elements = slideArray[i].children;

				// Loop through the elements of eachSlide, finding the nodes:
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

