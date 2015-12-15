
var html = document.cookie.replace(/\\t|\\n+|\s{2,}/g, '');

var splitSlides = R.split('<br/>');

var data = splitSlides(html);

// var	trimmed = JSON.parse(data).replace(/\\n/g, ' ');
// var	remBack = trimmed.replace(/\\/g, ' ');

console.log("data:", data);

// generate test slide
generateSlide([-100, 18, -110], data);

function generateSlide (coords, html) {

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
}
