'use strict';

var Zoomer = function(container) {
	var totalAnimationFrames = 60,
		zoomedIn = false,
		ratio = 0,
		currentAnimationFrame = 0,
		targetRatio = 40,
		scaleStep = 0,
		dx = 0,
		dy = 0,
		isAnimating = false;

	this.zoomIn = function() {
		if (zoomedIn) return;

		car.spawn();
		zoomedIn = true;
		track.connect();
		// it just werks, numbers are magic
		isAnimating = true;
		currentAnimationFrame = totalAnimationFrames;
		ratio = targetRatio;
		scaleStep = (ratio - 1) / totalAnimationFrames;

		dx = (start.x - ratio / 4) / (totalAnimationFrames / ratio);
		dy = (start.y - ratio / 4) / (totalAnimationFrames / ratio);
	}

	this.zoomOut = function() {
		zoomedIn = false;
		container.scale.x = container.scale.y = 1;
		container.x = container.y = 0;
	}

	this.animate = function() {
		if (currentAnimationFrame <= 0 && isAnimating) {
			isAnimating = false;
			this.doneZooming();
		}

		if (isAnimating) {
			container.x -= dx;
			container.y -= dy;
			container.scale.x = container.scale.y += scaleStep;
		}

		currentAnimationFrame--;
	}

	// override this callback
	this.doneZooming = function() {}

	this.setScaleFromSpeed = function(velocity, car) {
		ratio = targetRatio - 1000 * velocity;
		container.scale.x = container.scale.y = ratio;
		container.x = (-car.sprite.x + width / ratio / 2) * ratio;
		container.y = (-car.sprite.y + height / ratio / 2) * ratio;
	}
}