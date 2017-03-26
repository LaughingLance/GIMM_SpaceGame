function initLevel(numStars) {
	var newLevel = {};
	newLevel.maxScore = numStars;
	newLevel.currentScore = 0;

	// start the background at the top left edge
	newLevel.background = {
		x: 0,
		y: 0
	};

	// background image
	backgroundImg = new Image();
	backgroundImg.onload = function () {
		// make the size of the level accessible to the game
		newLevel.background.width = backgroundImg.width;
		newLevel.background.height = backgroundImg.height;
		generateStars();
	};

	function generateStars() {
		newLevel.stars = [];
		// place stars randomly throughout the level
		for (var i = 0; i < newLevel.maxScore; i++) {
			newLevel.stars.push(initStar((Math.random() * (level.background.width - canvas.width)) + 600,
				(Math.random() * (level.background.height/2)) + 250));
		}
	}

	newLevel.update = function () {
		// we need to move our background in relation to the player
		// 0 + width/2 -> don't move the background
		if (player.x <= (canvas.width / 2) - (player.width /2)) {
			newLevel.background.x = 0;
		}
		// background.width - width/2 -> don't move the background
		else if (player.x >= level.background.width - (canvas.width / 2) - (player.width /2)) {
			newLevel.background.x = -(level.background.width - canvas.width);
		}
		// anything in between -> move both the background and the player
		else {
			level.background.x -= player.xVelocity;
		}

		// update the stars that are on screen
		for (var index in level.stars) {
			var star = level.stars[index];
			if (!star.captured) {
				if (star.x >= -(level.background.x) - star.width && star.x <= -(level.background.x) + canvas.width) {
					star.canvasX = star.x + level.background.x;
					star.canvasY = star.y;
				}
				else {
					star.canvasX = undefined;
					star.canvasY = undefined;
				}
			}
		}
	};

	newLevel.render = function () {
		// draw the background
		context.drawImage(backgroundImg, newLevel.background.x, newLevel.background.y);

		// update and render our stars
		for (index in level.stars) {
			star = level.stars[index];
			if (player.collisionCheck(star)) {
				incrementScore(star);
			}
			// update and render our stars, if they have loaded.
			if (star.update && star.render && !star.captured) {
				star.update();
				star.render();
			}
		}
	};

	newLevel.reset = function(newMaxScore) {
		newLevel.maxScore = newMaxScore;
		newLevel.currentScore = 0;
		// make new stars
		generateStars();
		// reset background x, y
		newLevel.background.x = 0;
		newLevel.background.y = 0;
	};

	backgroundImg.src = "imgs/background.png";

	return newLevel;
}