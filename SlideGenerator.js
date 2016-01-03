
// ---------------------- GENERATE SLIDES --------------------- //

function SlideGenerator (input, colorScheme){
	this.colorScheme = colorScheme;
	var cookieData = input;
	// console.log(cookieData);

	if( cookieData.charAt(1) === '<' ) {
		var html = cookieData.replace(/\\t|\\n+|\s{2,}/g, '');
		this.data = html;

	} else {
		var converter = new showdown.Converter({ noHeaderId: true }),
		    clipQuotes = R.replace(/"/g, ''),
		    removeNewLines = R.replace(/\\n+|\\t|\\r/g, '   '),
		    splitMkdn = R.split( '   ' ),
		    addQuotes = function(data){return '"'+data+'"'},
		    trimmedArray = R.compose(splitMkdn, removeNewLines, clipQuotes)(cookieData);

		var htmlConvert = '';
		for(var i = 0; i < trimmedArray.length; i++){
			var convertedMkdn = converter.makeHtml( trimmedArray[i] );
			htmlConvert += convertedMkdn.replace(/\n+/g, '');
		}
		var html = addQuotes(htmlConvert);
	}
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
			color: this.colorScheme.h1,
			size: 2,
			indent: ''
		},
		h2: {
			color: this.colorScheme.h2,
			size: 1.75,
			indent: ''
		},
		h3: {
			color: this.colorScheme.h3,
			size: 1.4,
			indent: '* '
		},
		h4: {
			color: this.colorScheme.h4,
			size: 1.25,
			indent: ''
		},
		p: {
			color: this.colorScheme.p,
			size: 1,
			indent: '       '
		},
		li: {
			color: this.colorScheme.li,
			size: 1,
			indent: ' - '
		},

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
	      	group.add( mesh );
	    }
	  } else if (subArray[0][0] === 'i') {
		var url = subArray[0].split(' ');
		
		for (var i = 0; i < url.length; i++) {
			if(url[i].charAt(0) === 's' && url[i].charAt(1) === 'r') {
				var imgSrc = url[i].replace(/src=|\s+|\'|\"|\\/g, '');

				// create image element to get the width and height attributes so we can render the sprite at the nessessary size
				var image = document.createElement('img');
				image.src = imgSrc;
				
				loader.crossOrigin = 'anonymous';
				loader.load( imgSrc, function ( texture ) {
					var material = new THREE.SpriteMaterial({ map: texture, color: 0xffffff})
					var sprite = new THREE.Sprite( material );
					sprite.position.set( posArray[0]+20, posArray[1]-9, posArray[2] )
					group.add( sprite );
					posArray[1]-=20;
					// set max height and width for sprites
					var maxHeight = 23,
						maxWidth = 25,
					    height = image.height,
					    width = image.width,
					    ratio = 1;
					// Check size of incoming image, change aspect accordingly
					if( height > maxHeight) {
						ratio = maxHeight / height;
					}
					sprite.scale.set( width * ratio, height * ratio );
				});
			}
		}
	  } else {
	    tagStore.push(subArray[0]);
	    contentStore.push(subArray[1]);
	  }
	});

	// Save the broken up html data into array
	var group = new THREE.Object3D();
	var generate3D = R.compose(createSlide, R.tail, divideAllContent, divideOnTagName);	
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

