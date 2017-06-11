'use strict';

var Track = function() {
	var circleRadius = 0.8;
	var coords = [];

	this.addPoint = function() {
		if (!mappingTime) return;

		var point = coords[coords.length - 1];
		if (point && drawer.x == point.x && drawer.y == point.y) return;
		gfx.drawCircle(drawer.x, drawer.y, circleRadius);
		coords.push({x: drawer.x, y: drawer.y});
	}

	this.connect = function() {
		if (!mappingTime) return;

		this.addPoint();
		mappingTime = false;
		this.redraw();
		gfx.moveTo(drawer.x, drawer.y);
		gfx.lineTo(start.x, start.y);
	}

	this.clear = function() {
		zoomer.zoomOut();
		coords = [];
		mappingTime = true;
		drivingTime = false;
		drawer.x = start.x;
		drawer.y = start.y;
		this.redraw();
	}

	this.redraw = function() {
		gfx.clear();
		gfx.beginFill(0xff0fff);
		gfx.lineStyle(3, 0xff0fff, 1);
		for (var i = 0; i < coords.length; i++) {
			coords[i].x = Math.round(coords[i].x * 100) / 100;
			coords[i].y = Math.round(coords[i].y * 100) / 100;
			var next = mod(i+1, coords.length);
			gfx.moveTo(coords[i].x, coords[i].y);
			gfx.lineTo(coords[next].x, coords[next].y);
			gfx.drawCircle(coords[i].x, coords[i].y, circleRadius);
		}
		gfx.endFill();
	}

	this.clearCheckpoints = function() {
		for (var i in coords) coords[i].checked = false;
	}

	this.updateCheckpoints = function(point) {
		var lapComplete = true;
		var numCoords = coords.length;
		for (var i = 1; i < numCoords; i++) {
			var cp = coords[i];
			if (!cp.checked) {
				if (distanceToPointSquared(cp, point) < 8) {
					cp.checked = true;
					markCheckpoint(cp);
				} else {
					lapComplete = false;
				}
			}
		}

		if (lapComplete && distanceToPointSquared(start, point) < 8) {
			var lapTime = Math.round((prevTime - lapStart) / 10) / 100;
			lapTimes.push(lapTime);
			lapStart = prevTime;

			if (lapTime < bestTime) {
				bestTime = lapTime;
				bestLog = movementLog.slice();
				document.getElementById("best-time").innerHTML = lapTime + " s";
			}

			movementLog = [];
			this.redraw();
			lapTimeSpan.innerHTML += lapTimes[lapTimes.length - 1] + " s\n";
			for (var i in coords) coords[i].checked = false;
		}
	}
		
	function markCheckpoint(cp) {
		gfx.lineStyle(0.6, 0xff9fff, 1);
		gfx.drawCircle(cp.x, cp.y, circleRadius * 2.5);
	}

	this.importCoords = function(track) {
		var tc = JSON.parse(track);
		coords = [];
		for (var i = 0; i < tc.length; i++)
			coords[i] = {x: tc[i][0], y: tc[i][1]};

		stage.removeChild(car);
		mappingTime = false;
		drivingTime = false;
		zoomer.zoomOut();
		this.redraw();
	}

	this.exportCoords = function() {
		var tc = [];
		for (var i = 0; i < coords.length; i++)
			tc.push([coords[i].x, coords[i].y]);

		return JSON.stringify(tc);
	}

	this.minDistSquared = function(point) {
		var minDist = 10;
		var numCoords = coords.length;
		for (var i = 0; i < numCoords; i++) {
			var dist = distanceToLineSquared(point, coords[i], coords[mod(i+1, numCoords)]);
			if (!isNaN(dist)) minDist = Math.min(minDist, dist);
			if (minDist <= 2.4) return minDist;
		}

		return minDist;
	}

	/*
	 * Squared distance from point p0 to line p1->p2
	 * https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
	 */
	 
	function distanceToLineSquared(p0, p1, p2) {
		// check if within bounding box
		var bot 	= Math.max(p1.y, p2.y) + 3,
			top 	= Math.min(p1.y, p2.y) - 3,
			left 	= Math.min(p1.x, p2.x) - 3,
			right 	= Math.max(p1.x, p2.x) + 3;

		if (p0.x < left || p0.x > right || p0.y < top || p0.y > bot) return 10;

		// calculate distance squared
		var dy = p2.y - p1.y;
		var dx = p2.x - p1.x;
		return Math.pow(dy * p0.x - dx * p0.y + p2.x * p1.y - p1.x * p2.y, 2) / (dy * dy + dx * dx);
	}

	function distanceToPointSquared(p1, p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	}
}