<!doctype html>
<html>
<head>
	<script src="/scripts/pixi.min.js"></script>
	<title>Testfest</title>
	<style>
	body {
		margin: 0;
		height: 100%;
	}

	#main {
		margin: 10px auto;
		height: 600px;
		width: 600px;
		border: 1px solid #333;
	}

	.col {
		float: left;
		width: 600px;
		height: 600px;
	}
	</style>
</head>
<body>
	<button onclick="pause()">Pause</button>
	<input type="range" id="slider">
	<div id="main">
	</div>

<script>

var distortion = 0;
document.getElementById("slider").oninput = function() { distortion = +this.value; };

var size = 600
var numCircles = 25;

var renderer = PIXI.autoDetectRenderer(size, size, {transparent: true, antialias: true});
document.getElementById("main").appendChild(renderer.view);
var stage = new PIXI.Container();

// stage.hitArea = new PIXI.Rectangle(0, 0, size, size);
stage.interactive = true;

stage.on('mousemove', function(mouseData) {
	// console.log("X = "+mouseData.data.originalEvent.movementX);
	// console.log("Y = "+mouseData.data.originalEvent.movementY);
	console.log(mouseData.data.originalEvent);
});

var gfx = new PIXI.Graphics();
stage.addChild(gfx);

requestAnimationFrame(animate);
var frame = 0;
var paused = false;

function pause() {
	paused = !paused;
}

function animate() {
	if (paused) {
		requestAnimationFrame(animate);
		return;
	}

	var step = (distortion - 50) * 100;
	gfx.clear();
	gfx.beginFill(0xa30399);

	for (var i = 0; i < numCircles; i++) {
		// inner ring
		var x = 300 + Math.sin(frame / step * (i + 15) * 5) * Math.cos(frame / step * 12) * 120;
		var y = 300 + Math.cos(frame / step * (i + 15) * 5) * Math.sin(frame / step * 12) * 120;
		var r =  15 + Math.cos(frame / step) * 5;

		gfx.drawCircle(x, y, r);
	}

	gfx.beginFill(0xbabe0e);

	for (var i = 0; i < numCircles; i++) {
		// outer ring
		var dist = 250;

		var x = 300 + Math.sin(frame / step * (i + 5) * 5) * Math.cos(frame / step * 80) * dist;
		var y = 300 - Math.cos(frame / step * (i + 5) * 5) * Math.sin(frame / step * 12) * dist;
		var r =  25 - Math.cos(frame / step) * 15;

		gfx.drawCircle(x, y, r);
	}

	renderer.render(stage);
	frame++;
	requestAnimationFrame(animate);
}


</script>


</body>
</html>