var requestAnimationFrame, canvas, context, timeout, width, height, keys, player, friction, gravity;
var score, scoreCard;
var levelCleared = false;
var levelCount = 1;
var orbit = false;

(initialize());

function initialize () {

	document.getElementById('restartButton').onclick = function () {
		location.reload();	
	};


	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimation || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	// these can be arbitrary, but should be less than the background image dimensions
	// height can be the same if there will be no vertical change in background
	width = 800;
	height = 600;
	canvas.width = width;
	canvas.height = height;

	level = initLevel(10);

	score = 0;
	scoreCard = document.getElementById('score');
	scoreCard.innerHTML = score;

	keys = [];
	friction = 0.8;
	gravity = -0.7;

	player = initPlayer(width / 4);

}

// on page load
window.addEventListener('load', function () {
	update();
});

// on keydown event
document.body.addEventListener('keydown', function (e) {
	keys[e.keyCode] = true;
});

// on keyup event
document.body.addEventListener('keyup', function (e) {
	keys[e.keyCode] = false;
});

// update the game canvas
function updateGame () {
	// check for keys pressed
	if (keys[40] || keys[32]) {
		// down arrow || space bar
		if (!player.jumping) {
			player.jumping = false;
			player.yVelocity = player.maxSpeed * .5;
		}
	}
	if (keys[39]) {
		// right arrow
		player.direction = 'right';
		if (player.xVelocity < player.maxSpeed) {
			player.xVelocity++;
		}
	}
	if (keys[37]) {
		// left arrow
		player.direction = 'left';
		if (player.xVelocity > -player.maxSpeed) {
			player.xVelocity--;
		}
	}

	// clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (!levelCleared) {
		
		if (!orbit) {	
			// update player and level info
			player.update();
			level.update();

			// draw player and level
			// we want the level to be on the bottom, so we need to draw it first
			level.render();
			player.render();
		
		}
		else {
			// setup a message to display
			context.fillStyle = '#5A5A5A';
			context.font = '4em "Times New Roman"';
			var message = 'You have gone into Orbit!';
			context.fillText(message, (canvas.width - context.measureText(message).width)/2, canvas.height/6*1);
			var gameOver = 'Game Over';
			context.fillText(gameOver, (canvas.width - context.measureText(gameOver).width)/2, canvas.height/6*3);
		}

	}
	else {
		
		if (levelCount == 10) {
			context.fillStyle = '#6A6A6A';
			context.font = '4em "Times New Roman"';
			var winCongrats = 'Congratulations on';
			context.fillText(winCongrats, (canvas.width - context.measureText(winCongrats).width)/2, canvas.height/6*1);
			var winLevel = 'completing level ' + levelCount + '...';
			context.fillText(winLevel, (canvas.width - context.measureText(winLevel).width)/2, canvas.height/6*2);
			var winWin =  'You win!';
			context.fillText(winWin, (canvas.width - context.measureText(winWin).width)/2, canvas.height/6*4);

		} else {
		
			// setup a message to display
			context.fillStyle = '#5A5A5A';
			context.font = '6em "Times New Roman"';
			var message = 'Level ' + levelCount + ' cleared!';
			context.fillText(message, (canvas.width - context.measureText(message).width)/2, canvas.height/2);
			// display the message for 2 seconds before clearing it and starting a new level
			
			if (timeout === undefined) {
				timeout = window.setTimeout(function () {
					levelCleared = false;
					levelCount++;
					level.reset(level.maxScore + Math.ceil(level.maxScore/2));
					player.reset();
					window.clearTimeout(timeout);
					timeout = undefined;
				}, 2000);
			}
		}
	}
}






// collision detection
function checkColl (obj1, obj2) {
	return (obj1.x + obj1.width >= obj2.x)
		&& (obj1.x <= obj2.x + obj2.width)
		&& (obj1.y <= obj2.y + obj2.height)
		&& (obj1.y + obj1.height >= obj2.y);
}

function incrementScore(star) {
	if (!star.captured) {
		star.capture();
		level.currentScore++;
		scoreCard.innerHTML = score + level.currentScore;

		if (level.currentScore == level.maxScore) {
			levelCleared = true;
			score = score + level.currentScore;
			scoreCard.innerHTML = score;
		}
	}

}

// on frame draw
function update () {
	updateGame();
	// update frame
	requestAnimationFrame(update);
}
