/********************************************************************
								DAT GUI
*********************************************************************/
var item = {
	memory: [0, 0, 0],
	size: 1.0,
	rotateX: 0.0,
	rotateY: 0.0,
	rotateZ: 0.0,
	translateX: 0,
	translateY: 0,
	translateZ: 0,
	ringX: 0,
	ringY: 0,
	ringZ: 0,
	stopRotation() {
		if (item.ringX || item.ringY || item.ringZ) {
			item.memory = [item.ringX, item.ringY, item.ringZ];
		}
		item.ringX = 0;
		item.ringY = 0;
		item.ringZ = 0;
	},
	resumeRotation() {
		item.ringX = item.memory[0];
		item.ringY = item.memory[1];
		item.ringZ = item.memory[2];
	}
};

var gui = new dat.GUI({autoPlace: false});
gui.domElement.id = 'gui';
document.body.appendChild(gui.domElement);

gui.add(item, 'size', 1, 10).step(0.1);

var f1 = gui.addFolder('Translate Slides');
f1.add(item, 'translateX', -3000, 3000).step(1);
f1.add(item, 'translateY', -3000, 3000).step(1);
f1.add(item, 'translateZ', -3000, 3000).step(1);

var f2 = gui.addFolder('Rotate Slides');
f2.add(item, 'rotateX', 0, 360);
f2.add(item, 'rotateY', 0, 360);
f2.add(item, 'rotateZ', 0, 360);

var f3 = gui.addFolder('test');
f3.add(item, 'stopRotation');
f3.add(item, 'resumeRotation');
gui.open();
