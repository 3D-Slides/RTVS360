function TextWrapper () {
	
}

// options: string, size, color, lineLength, height, startingX, startingY, startingZ
TextWrapper.prototype.Wrap = function ( options ) {
	var group = new THREE.Object3D();
	
	// Save Starting Positions
	var position = { 
		x: options.startingX, 
		y: options.startingY, 
		z: options.startingZ 
	};

	var cutText = options.string;

	while( cutText.length > options.lineLength ) {

		// Grab First part of string and render as new line. 
		// Make sure string is cut at a space and not mid-word.
		if( cutText.charAt(options.lineLength) === ' ' ) {

			// cut line at space
			var line = cutText.substring(0, options.lineLength);
			cutText = cutText.slice( options.lineLength );

		} else {

			// search for closest space
			var counter = 1;
			while( cutText.charAt(options.lineLength - counter) !== ' ' ) {
				counter++;
			}

			// cut line at space
			var line = cutText.substring( 0, options.lineLength - counter );
			cutText = cutText.slice( options.lineLength - counter );
		}

		line = line.trim();

		// Create line geometry, material, and mesh
		var textGeometry = new THREE.TextGeometry( options.indent + line, { size: options.size, height: options.height, font: 'helvetiker' } ),
			textMaterial = new THREE.MeshLambertMaterial( { color: options.color } ),
			textMesh = new THREE.Mesh( textGeometry, textMaterial );

		// Set it's position, then offset y coord for next line
		textMesh.position.set( position.x, position.y, position.z );
		
		group.add( textMesh );
		position.y -= options.size*2;

	}

	cutText = cutText.trim();
	// If text is less than lineLength, just render one text geometry
	var textGeometry = new THREE.TextGeometry( (options.indent === ' - ') ? cutText : options.indent +cutText, { size: options.size, height: options.height, font: 'helvetiker' } ),
		textMaterial = new THREE.MeshLambertMaterial({ color: options.color }),
		textMesh = new THREE.Mesh( textGeometry, textMaterial );
	
	textMesh.position.set( position.x, position.y, position.z )
	group.add( textMesh );

	return group;

}

