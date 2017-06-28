'use strict';

var Car = function(sprite) {
	var acceleration = 0.0005;
	var speed = {x: 0, y: 0};

	sprite.pivot = new PIXI.Point(4, 6);
	sprite.scale.x = sprite.scale.y = 0.08;
	this.sprite = sprite;

	this.spawn = function() {
		sprite.x = start.x;
		sprite.y = start.y;
		stage.addChild(sprite);
		speed.x = speed.y = 0;
	}

	this.update = function(move, dt) {
		if (move.x || move.y) sprite.rotation = Math.PI + Math.atan2(move.y, move.x) - Math.atan2(1, 0);

		var normalize = !!move.x + !!move.y === 2 ? Math.SQRT1_2 : 1;
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

	this.velocity = function() {
		return Math.sqrt(speed.x * speed.x + speed.y * speed.y);
	}
}