function initStar (startingX, startingY) {
	var newStar = {};
	newStar.x = startingX;
	newStar.y = startingY;
	newStar.captured = false;

	var StarImg = new Image();
	StarImg.onload = function () {
		newStar.width = 80;
		newStar.height = StarImg.height;

		newStar.spriteSheet = StarImg;

		newStar.flyingSprite = sprite({
			width: newStar.width,
			height: newStar.height,
			image: newStar.spriteSheet,
			numberOfFrames: 2,
			startingFrameIndex: 0,
			ticksPerFrame: (Math.random() * 10) + 8,  // random wing flap rate between 8 and 18
			loop: true
		});

		newStar.render = function () {
			newStar.flyingSprite.render(newStar.canvasX, newStar.canvasY);
		};

		newStar.update = function () {
			newStar.flyingSprite.update();
		};
	};

	newStar.capture = function() {
		newStar.captured = true;
	};

	StarImg.src = "imgs/star-sprite.png";

	return newStar;

}