
// ---------------------- GENERATE SLIDES --------------------- //

function SlideGenerator (){
	var cookieData = document.cookie;
	// console.log('char 1:', cookieData);

	if( cookieData.charAt(1) === '<' ) {
		var html = cookieData.replace(/\\t|\\n+|\s{2,}/g, '');
		this.data = html;

	} else {
		var converter = new showdown.Converter({noHeaderId: true}),
		    clipQuotes = R.replace(/"/g, ''),
		    removeNewLines = R.replace(/\\n+|\\t|\\r/g, '   '),
		    splitMkdn = R.split( '   ' ),
		    addQuotes = function(data){return '"'+data+'"'};

		var trimmedArray = R.compose(splitMkdn, removeNewLines, clipQuotes)(cookieData);
		// console.log('trimmedArray: ', trimmedArray);
		
		var htmlConvert = '';
		for(var i = 0; i < trimmedArray.length; i++){
			var convertedMkdn = converter.makeHtml( trimmedArray[i] );
			htmlConvert += convertedMkdn.replace(/\n+/g, '');

		}

		var html = addQuotes(htmlConvert);
	}
		
	// console.log("data: ", this.data);

	var splitSlides = R.split('<hr />');

	this.data = splitSlides(html);
	this.slideLocations = [];

}

// Add a single 3d slide:
SlideGenerator.prototype.addOneSlide3D = function (coords, html) {
	var tagStore = [];
	var contentStore = [];
	// split html data at tags
	var divideOnTagName = R.split('<');
	var divideContentAndTag = R.split('>');
	var divideAllContent = R.map(divideContentAndTag);

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
	};

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
		slideMesh.position.set(posArray[0], posArray[1], posArray[2]);
		slideMesh.castShadow = true;
		slideMesh.receiveShadow = true;
		posArray[1]-=4;
		return slideMesh;
	}

	// check if element has /, if it does then pop it into variable then render the content
	var createSlide = R.forEach(function(subArray) {
	  if( R.test(/\//, subArray[0]) && subArray[0][0] !== 'i') {
	    var tag = tagStore.pop();
	    var content = contentStore.pop();
	    if(content !== '') {
	      	var mesh = makeMesh(tag, content);
	      	group.add(mesh);
	    }
	  } else if (subArray[0][0] === 'i'){
		var url = subArray[0].split(' ');
		
		for (var i = 0; i < url.length; i++) {
			if(url[i].charAt(0) === 's' && url[i].charAt(1) === 'r') {
				console.log('cross origin set');
				var imgSrc = url[i].replace(/src=|\s+|\'|\"/g, '');
				console.log('trimmed src:', imgSrc);

				loader.load(imgSrc, function ( texture ) {
					console.log(texture, texture.image.width, texture.image.height);
					var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );
					var sprite = new THREE.Sprite( spriteMaterial );
					sprite.position.set(posArray[0] + 20, posArray[1]-10, posArray[2]);
					posArray[1]-=4;
					sprite.castShadow = true;
					sprite.receiveShadow = true;
					group.add( sprite );

						// check for image size, set size accordingly
					if (texture.image.width < 500 || texture.image.height < 200){
						sprite.scale.set( texture.image.width, texture.image.height, 10 );
					} else if ( 500 < texture.image.width < 700 || 200 < texture.image.height < 400) {
						sprite.scale.set( texture.image.width/20, texture.image.height/20, 10 );
					} else if (700 < texture.image.width < 1100 || 400 < texture.image.height < 700 ) {
						sprite.scale.set( texture.image.width/40, texture.image.height/40, 10 );
					} else if (1100 < texture.image.width < 1500 || 700 < texture.image.height < 1200) {
						sprite.scale.set( texture.image.width/80, texture.image.height/80, 10 );
					}

				});
			}
		}
	  } else {
	    tagStore.push(subArray[0]);
	    contentStore.push(subArray[1]);
	  }
	});

	// save the broken up html data into array
	var group = new THREE.Object3D();

	var generate3D = R.compose(createSlide, R.tail, divideAllContent, divideOnTagName);
	
	// console.log('debug:', R.compose(R.tail, divideAllContent, divideOnTagName)(html));
	

	generate3D(html);
	group.castShadow = true;
	group.receiveShadow = true;
	glScene.add(group);	
};

// Add all 3d slides in html:
SlideGenerator.prototype.addAllSlides3D = function(location, slides) {
	var x = location[0];
	var y = location[1];
	var z = location[2];
	
	// assigning rows and columns for the slides. x values are rows,
	// z values are the columns
	if (x > 160) {
		x = -160;
		z += 100;
	}

	var head = R.head(slides);
	if (head) {
		this.slideLocations.push([x, y, z]);
		this.addOneSlide3D([x, y, z], head);
		this.addAllSlides3D([x+80, y, z], R.tail(slides));
	}
};

						 //------------------------------------------//
// ----------------------- FOR 2D SLIDES, RENDERED WITH CSS3DRENDERER -------------------------------- //
					     //------------------------------------------//
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
			// cssObj.style.padding = 20;
			cssScene.add(cssObj);
			
		}
	} else {
		console.error('Your coords do not match up with your slides!');
	}
};
