// TODO can't move direction if no tiles can move
// TODO lose function
// TODO win function




var SQUARES;
var c;
var ctx;
var SIZE = 600;
var FIB = [1, 2];

function initialize(canvas) {
	c = canvas;
	ctx = c.getContext("2d");
	ctx.font = "100px Arial";

	//Create array of zeros
	SQUARES = Array.apply(null, Array(9)).map(Number.prototype.valueOf,0);
	generateSquare();

	drawBoard();
}

function drawBoard() {
	ctx.lineWidth = 15;
	ctx.fillStyle = "#8CA699";
	ctx.roundRect(0, 0, SIZE, SIZE, 20).fill();

	drawSquares();


	// Draw tic tac toe type internal lines
	ctx.moveTo(SIZE / 3, 0);
	ctx.lineTo(SIZE / 3, SIZE);
	ctx.stroke();
	ctx.moveTo(SIZE * 2 / 3, 0);
	ctx.lineTo(SIZE * 2 / 3, SIZE);
	ctx.stroke();
	ctx.moveTo(0, SIZE / 3);
	ctx.lineTo(SIZE, SIZE / 3);
	ctx.stroke();
	ctx.moveTo(0, SIZE * 2 / 3);
	ctx.lineTo(SIZE, SIZE * 2 / 3);
	ctx.stroke();

	for (var col = 0; col < 3; col++) {
		for (var row = 0; row < 3; row++) {
			ctx.roundRect(col * SIZE / 3, row * SIZE / 3, SIZE / 3, SIZE / 3, 30).stroke();
		}
	}
}

function generateSquare() {
	// Check if there is an empty square
	if (SQUARES.indexOf(0) > -1) {
		//Generate number between 1 and 9
		var index = Math.floor((Math.random() * 10));
		while (SQUARES[index] != 0) {
			var index = Math.floor((Math.random() * 10));
		}
		SQUARES[index] = 1;
	}
}

function drawSquares() {
	for (var i = 0; i < SQUARES.length; i++) {
		if (SQUARES[i] > 0) {
			drawSquare((i % 3) * SIZE / 3, (Math.floor(i / 3)) * SIZE / 3, SQUARES[i]);
		}
	}
}

function drawSquare(squareX, squareY, value) {
	ctx.fillStyle = "#3399FF";
	ctx.fillRect(squareX, squareY, SIZE / 3, SIZE / 3);

	ctx.fillStyle = "red";
	ctx.textAlign="center";
	ctx.textBaseline = 'middle';
	ctx.fillText(value, squareX + SIZE / 6 , squareY + SIZE / 6);
}

//Check if two numbers are adjacent in series
function fibCheck(first, second) {
	while (SQUARES[first] + SQUARES[second] > Math.max.apply(null, FIB)) {
		calculateFib();
	}
	return (SQUARES[first] != 0 && SQUARES[second] != 0 && 
		((Math.abs(FIB.indexOf(SQUARES[first]) - FIB.indexOf(SQUARES[second])) == 1)) ||
		(SQUARES[first] == 1 && SQUARES[first] == SQUARES[second]));
}

//Checks if any squares can combine after a move
function collide(direction) {
	var collided = false;
    switch(direction) {
		// left key pressed
		case 37:
			// Go through each row
			for (var receiving = 0; receiving < SQUARES.length; receiving += 3) {
				if (fibCheck(receiving, receiving + 1) && SQUARES[receiving] != 0) {
					SQUARES[receiving] += SQUARES[receiving + 1];
					SQUARES[receiving + 1] = SQUARES[receiving + 2];
					SQUARES[receiving + 2] = 0;
					collided = true;
				} else if (fibCheck(receiving + 1, receiving + 2) && SQUARES[receiving + 1] != 0) {
					SQUARES[receiving + 1] += SQUARES[receiving + 2];
					SQUARES[receiving + 2] = 0;
					collided = true;
				}
			}
		break;

		// up key pressed
		case 38:
			// Go through each columns
			for (var receiving = 0; receiving < 3; receiving ++) {
				if (fibCheck(receiving, receiving + 3) && SQUARES[receiving] != 0) {
					SQUARES[receiving] += SQUARES[receiving + 3];
					SQUARES[receiving + 3] = SQUARES[receiving + 6];
					SQUARES[receiving + 6] = 0;
					collided = true;
				} else if (fibCheck(receiving + 3, receiving + 6) && SQUARES[receiving + 3] != 0) {
					SQUARES[receiving + 3] += SQUARES[receiving + 6];
					SQUARES[receiving + 6] = 0;
					collided = true;
				}
			}
		break;
		
		// right key pressed
		case 39:
			// Go through each row
			for (var receiving = 0; receiving < SQUARES.length; receiving += 3) {
				if (fibCheck(receiving + 1, receiving + 2) && SQUARES[receiving + 2] != 0) {
					SQUARES[receiving + 2] += SQUARES[receiving + 1];
					SQUARES[receiving + 1] = SQUARES[receiving];
					SQUARES[receiving] = 0;
					collided = true;
				} else if (fibCheck(receiving + 1, receiving) && SQUARES[receiving] != 0) {
					SQUARES[receiving + 1] += SQUARES[receiving];
					SQUARES[receiving] = 0;
					collided = true;
				}
			}
		break;

		// down key pressed
		case 40:
			// Go through each columns
			for (var receiving = 0; receiving < 3; receiving ++) {
				if (fibCheck(receiving + 6, receiving + 3) && SQUARES[receiving + 6] != 0) {
					SQUARES[receiving + 6] += SQUARES[receiving + 3];
					SQUARES[receiving + 3] = SQUARES[receiving];
					SQUARES[receiving] = 0;
					collided = true;
				} else if (fibCheck(receiving, receiving + 3) && SQUARES[receiving] != 0) {
					SQUARES[receiving + 3] += SQUARES[receiving];
					SQUARES[receiving] = 0;
					collided = true;
				}
			}
		break;
	}	

	if (collided) {
		collide(direction);
	}
}

function checkLose() {
	//Check for no empty squares
	if (SQUARES.indexOf(0) < 0) {

		//Check center pieces
		if (SQUARES)
		for (var i = 1; i < SQUARES.length; i += 2) {
			
		}
	}
}

function calculateFib() {
	FIB[FIB.length] = FIB[FIB.length - 1] + FIB[FIB.length - 2];
	console.log(FIB);
}

/*
	Adapted from Grumdrig on http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
*/
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x+r, y);
	this.arcTo(x+w, y,   x+w, y+h, r);
	this.arcTo(x+w, y+h, x,   y+h, r);
	this.arcTo(x,   y+h, x,   y,   r);
	this.arcTo(x,   y,   x+w, y,   r);
	this.closePath();
	return this;
}

document.addEventListener('keydown', function(event) {
	var prevBoard = SQUARES.slice(0);
    switch(event.keyCode) {
		// left key pressed
		case 37:
			// Go through each row
			for (var i = 0; i < SQUARES.length; i += 3) {
				if (SQUARES[i + 1] == 0 && SQUARES[i] == 0) {
						SQUARES[i] = SQUARES[i + 2];
						SQUARES[i + 2] = 0;
				} else if (SQUARES[i] == 0) {
					SQUARES[i] = SQUARES[i + 1];
					SQUARES[i + 1] = SQUARES[i + 2];
					SQUARES[i + 2] = 0;
				} else if (SQUARES[i + 1] == 0) {
					SQUARES[i + 1] = SQUARES[i + 2];
					SQUARES[i + 2] = 0;
				}
			}
		break;

		// up key pressed
		case 38:
			// Go through each column
			for (var i = 0; i < 3; i++) {
				if (SQUARES[i + 3] == 0 && SQUARES[i] == 0) {
						SQUARES[i] = SQUARES[i + 6];
						SQUARES[i + 6] = 0;
				} else if (SQUARES[i] == 0) {
					SQUARES[i] = SQUARES[i + 3];
					SQUARES[i + 3] = SQUARES[i + 6];
					SQUARES[i + 6] = 0;
				} else if (SQUARES[i + 3] == 0) {
					SQUARES[i + 3] = SQUARES[i + 6];
					SQUARES[i + 6] = 0;
				}
			}
		break;
		
		// right key pressed
		case 39:
			// Go through each row
			for (var i = 0; i < SQUARES.length; i += 3) {
				if (SQUARES[i + 1] == 0 && SQUARES[i + 2] == 0) {
						SQUARES[i + 2] = SQUARES[i];
						SQUARES[i] = 0;
				} else if (SQUARES[i + 2] == 0) {
					SQUARES[i + 2] = SQUARES[i + 1];
					SQUARES[i + 1] = SQUARES[i];
					SQUARES[i] = 0;
				} else if (SQUARES[i + 1] == 0) {
					SQUARES[i + 1] = SQUARES[i];
					SQUARES[i] = 0;
				}
			} 
		break;

		// down key pressed
		case 40:
			// Go through each column
			for (var i = 0; i < 3; i++) {
				if (SQUARES[i + 3] == 0 && SQUARES[i + 6] == 0) {
						SQUARES[i + 6] = SQUARES[i];
						SQUARES[i] = 0;
				} else if (SQUARES[i + 6] == 0) {
					SQUARES[i + 6] = SQUARES[i + 3];
					SQUARES[i + 3] = SQUARES[i];
					SQUARES[i] = 0;
				} else if (SQUARES[i + 3] == 0) {
					SQUARES[i + 3] = SQUARES[i];
					SQUARES[i] = 0;
				}
			}
		break;
	}	

	//Make sure it's an arrow key
	if (event.keyCode > 36 && event.keyCode < 41) {
		collide(event.keyCode);
		
		var isSame = true;
		for (var i = 0; i < SQUARES.length && isSame; i++) {
			if (SQUARES[i] != prevBoard[i]) {
				isSame = false;
			}
		}
		if (!isSame) {
			generateSquare();
			drawBoard();
			checkLose();
		}
	}
}, false);