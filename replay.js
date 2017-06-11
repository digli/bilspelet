'use strict';

function Replay(sprite, log) {
	var startTime = 0;
	var currTime = 0;
	var replayIndex = 0;
	var move = {x: 0, y: 0};

	var acceleration = 0.0005;
	var halfsqrt2 = Math.sqrt(2) / 2;
	var speed = {x: 0, y: 0};

	this.update = function(dt) {
		// all pseudo code from here
		currTime += dt;
		if (currTime > log[replayIndex].time) {
			replayIndex++;
			if (replayIndex >= log.length) {} // RESTART
			sprite.x = log[replayIndex].x;
			sprite.y = log[replayIndex].y;
			move.x = log[replayIndex].moveX;
			move.y = log[replayIndex].moveY;
			speed = log[replayIndex].speed;
			if (move.x || move.y) sprite.rotation = Math.PI / 2 + Math.atan2(move.y, move.x);
		}

		var normalize = !!move.x + !!move.y === 2 ? halfsqrt2 : 1;
		var dx = move.x * acceleration * normalize;
		var dy = move.y * acceleration * normalize;

		speed.x *= 0.98;
		speed.y *= 0.98;
		speed.x += dx;
		speed.y += dy;

		if (track.minDistSquared(sprite) > 2.4) {
			speed.x *= 0.92;
			speed.y *= 0.92;
		}

		sprite.x += speed.x * dt;
		sprite.y += speed.y * dt;

		track.updateCheckpoints(sprite);
	}

	// peer2peer magic
	this.setStream = function(stream) {
		// data = stream;
	}
}