
var SQUARES;
var c;
var ctx;
var SIZE = 500;
var NUM_SQUARES = 4;
var SQUARE_SIZE = SIZE / NUM_SQUARES;
var FIB = [1, 2];
var myScore = 0
var bestScore = 0

//From html5 canvas tutorials
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    };
})();

//Add keyboard even listener
document.addEventListener('keydown', function(event) {
	//Make sure it's an arrow key
	if (event.keyCode > 36 && event.keyCode < 41) {
		var prevBoard = SQUARES.slice(0);
		moveCollide(event.keyCode);
		
		var isSame = true;
		for (var i = 0; i < SQUARES.length && isSame; i++) {
			if (SQUARES[i] != prevBoard[i]) {
				isSame = false;
			}
		}
		if (!isSame) {
			drawBoard();
			generateSquare();
			checkWin();
			checkLose();
		} 
	}
}, false);

function initialize(canvas) {
	c = canvas;
	ctx = c.getContext("2d");
	ctx.font = "80px Arial";

	//Create array of zeros
	SQUARES = Array.apply(null, Array(NUM_SQUARES * NUM_SQUARES)).map(Number.prototype.valueOf,0);
	drawBoard();
	generateSquare();
}

function resetGame(){
	initialize(document.getElementById("canvas"));
	myScore = 0;
}
	  
function drawBoard() {
	ctx.lineWidth = 15;
	ctx.fillStyle = "#8CA699";
	ctx.roundRect(0, 0, SIZE, SIZE, 20).fill();
	
	drawSquares();
	drawBoardTemplate();
}

function drawBoardTemplate() {
	// Draw tic tac toe type internal lines
	ctx.moveTo(SQUARE_SIZE, 0);
	ctx.lineTo(SQUARE_SIZE, SIZE);
	ctx.stroke();
	ctx.moveTo(2 * SQUARE_SIZE, 0);
	ctx.lineTo(2 * SQUARE_SIZE, SIZE);
	ctx.stroke();
	ctx.moveTo(0, SQUARE_SIZE);
	ctx.lineTo(SIZE, SQUARE_SIZE);
	ctx.stroke();
	ctx.moveTo(0, 2 * SQUARE_SIZE);
	ctx.lineTo(SIZE, 2 * SQUARE_SIZE);
	ctx.stroke();
	ctx.moveTo(0, 3 * SQUARE_SIZE);
	ctx.lineTo(SIZE, 3 * SQUARE_SIZE);
	ctx.stroke();

		
	for (var col = 0; col < 4; col++) {
		for (var row = 0; row < 4; row++) {
			ctx.roundRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE, 30).stroke();
		}
	}
}

function drawSquares() {
	for (var i = 0; i < SQUARES.length; i++) {
		if (SQUARES[i] > 0) {
			drawSquare((i % NUM_SQUARES) * SQUARE_SIZE, (Math.floor(i / NUM_SQUARES)) * SQUARE_SIZE, SQUARES[i]);
		}
	}
}

function drawSquare(squareX, squareY, value) {
	ctx.fillStyle = "#3399FF";
	ctx.fillRect(squareX, squareY, SQUARE_SIZE, SQUARE_SIZE);

	ctx.font = "80px Arial";
	ctx.fillStyle = "#4DB870";
	ctx.textAlign="center";
	ctx.textBaseline = 'middle';
	ctx.fillText(value, squareX + SQUARE_SIZE / 2 , squareY + SQUARE_SIZE / 2);
}

function generateSquare() {
	// Check if there is an empty square
	if (SQUARES.indexOf(0) > -1) {
		//Generate number between 1 and 9
		var index = Math.floor((Math.random() * (NUM_SQUARES * NUM_SQUARES + 1)));
		while (SQUARES[index] != 0) {
			var index = Math.floor((Math.random() * (NUM_SQUARES * NUM_SQUARES + 1)));
		}
		animateSquareGen((index % NUM_SQUARES) * SQUARE_SIZE, (Math.floor(index / NUM_SQUARES)) * SQUARE_SIZE,(new Date()).getTime());
		SQUARES[index] = 1;
	}
}

function animSquare(squareX, squareY, value, size) {
	ctx.fillStyle = "#3399FF";
	ctx.fillRect(squareX, squareY, size, size);

	ctx.font = "" + (80 * size / SQUARE_SIZE) + "px Arial";
	ctx.fillStyle = "#4DB870";
	ctx.textAlign="center";
	ctx.textBaseline = 'middle';
	ctx.fillText(value, squareX + size / 2 , squareY + size / 2);
}

function animateSquareGen(squareX, squareY, startTime) {
	// update
	var time = (new Date()).getTime() - startTime;

	var growSpeed = 500;

	var newSize = growSpeed * time / 1000;

	if(newSize < SQUARE_SIZE) {
		if(newSize > SQUARE_SIZE) {
			newSize = SQUARE_SIZE;
		}

		// clear
		ctx.clearRect(squareX + (SQUARE_SIZE - newSize) / 2, squareY + (SQUARE_SIZE - newSize) / 2, newSize, newSize);
		animSquare(squareX + (SQUARE_SIZE - newSize) / 2, squareY + (SQUARE_SIZE - newSize) / 2, 1, newSize);
		drawBoardTemplate();
		// request new frame
		requestAnimFrame(function() {
			animateSquareGen(squareX, squareY, startTime);
		});	
	} else {

	}
}

//Calculates the next number in the sequence and appends it to array
function calculateFib() {
	FIB[FIB.length] = FIB[FIB.length - 1] + FIB[FIB.length - 2];
	console.log(FIB);
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

//Checks if there are no moves left (lose)
function checkLose() {
	//Check for no empty squares
	if (SQUARES.indexOf(0) < 0) {
		var canCombine = false;
		//Check every other piece
		for (var i = 1; i < SQUARES.length && !canCombine; i += 2) {
			if ((i - NUM_SQUARES > 0 && fibCheck(i, i - NUM_SQUARES)) ||
				(i + NUM_SQUARES < SQUARES.length && fibCheck(i, i + NUM_SQUARES)) ||
				(i - 1 > 0 && fibCheck(i, i - 1)) ||
				(i + 1 < SQUARES.length && fibCheck(i, i + 1))) {
				
				canCombine = true;
			} 
		}

		if (!canCombine) {
			window.alert("YOU LOSE!");
		}
	}
}

//Checks for a win
function checkWin() {
	if (SQUARES.indexOf(144) > -1) {
		window.alert("YOU WIN!");
	}
}

// Moves squares and combines them based on the direction
function moveCollide(direction) {
	switch(direction) {
		// left key pressed
		case 37:
			// Go through each row
			for (var i = 0; i < SQUARES.length; i += NUM_SQUARES) {
				for (var offset = 0; offset < NUM_SQUARES - 1; offset++) {

					//Need count incase all values in column are zero
					var count = 0;

					//Count decreases relative to offset because each column you move over
					//The rightmost square needs to move one less
					while (SQUARES[i + offset] == 0 && count < NUM_SQUARES - offset - 1) {
						for (var move = i + offset; move < i + NUM_SQUARES - 1; move++) {
							SQUARES[move] = SQUARES[move + 1];
						}

						//Set last square to 0
						SQUARES[i + NUM_SQUARES - 1] = 0;
						count++;
					}
				}

				//Check for squares that can combine
				//Start at left then move right
				for (var receiving = i; receiving < i + NUM_SQUARES - 1; receiving++) {
					if (fibCheck(receiving, receiving + 1) && SQUARES[receiving] != 0) {
						SQUARES[receiving] += SQUARES[receiving + 1];
						SQUARES[receiving + 1] = 0;
						console.log(SQUARES);
						//If squares combine, you need to move the rest of the squares into the empty space
						moveCollide(direction);
						break;
					}
				}
			}

		break;

		// up key pressed
		case 38:
			// Go through each row
			// Move squares up 1 row if possible then go to next row
			for (var i = 0; i < SQUARES.length; i += NUM_SQUARES) {
				for (var offset = 0; offset < NUM_SQUARES; offset++) {
					
					//Need count incase all values in column are zero
					var count = 0;
					while (SQUARES[i + offset] == 0 && count < NUM_SQUARES - (i / NUM_SQUARES) - 1) {

						// move < NUM_SQUARES * (NUM_SQUARES - 1) prevents move from being in the last row
						for (var move = offset + i; move < NUM_SQUARES * (NUM_SQUARES - 1); move += NUM_SQUARES) {
							// Set square above to square below
							SQUARES[move] = SQUARES[move + NUM_SQUARES];
						}

						//Sets last square in column to 0
						SQUARES[(NUM_SQUARES) * (NUM_SQUARES - 1) + offset] = 0;
						count++;
					}
				}
			}

			//Check for squares that can combine
			//Has to be outside the above for loop because of the way the squares are moved
			for (var i = 0; i < SQUARES.length; i += NUM_SQUARES) {
				//Start at left then move right
				for (var receiving = i; receiving < NUM_SQUARES * (NUM_SQUARES - 1); receiving++) {
					if (fibCheck(receiving, receiving + NUM_SQUARES) && SQUARES[receiving] != 0) {
						SQUARES[receiving] += SQUARES[receiving + NUM_SQUARES];
						SQUARES[receiving + NUM_SQUARES] = 0;

						//If squares combine, you need to move the rest of the squares into the empty space
						moveCollide(direction);
						break;
					}
				}
			}
		break;
		
		// right key pressed
		case 39:
			// Go through each row
			for (var i = 0; i < SQUARES.length; i += NUM_SQUARES) {
				for (var offset = NUM_SQUARES - 1; offset >= 0; offset--) {

					//Need count incase all values in column are zero
					var count = 0;

					//Count decreases relative to offset because each column you move over
					//The rightmost square needs to move one less
					while (SQUARES[i + offset] == 0 && count < offset) {
						for (var move = i + offset; move > i - 1; move--) {
							SQUARES[move] = SQUARES[move - 1];
						}

						//Set last square to 0
						SQUARES[i] = 0;
						count++;
					}
				}

				//Check for squares that can combine
				//Start at right then move left
				for (var receiving = i + NUM_SQUARES - 1; receiving > i; receiving--) {
					if (fibCheck(receiving, receiving - 1) && SQUARES[receiving] != 0) {
						SQUARES[receiving] += SQUARES[receiving - 1];
						SQUARES[receiving - 1] = 0;

						//If squares combine, you need to move the rest of the squares into the empty space
						moveCollide(direction);
						break;
					}
				}
			}
		break;

		// down key pressed
		case 40:
			// Go through each row
			for (var i = 0; i < SQUARES.length; i += NUM_SQUARES) {
				for (var offset = 0; offset < NUM_SQUARES; offset++) {
					
					//Need count incase all values in column are zero
					var count = 0;
					while (SQUARES[SQUARES.length - NUM_SQUARES - i + offset] == 0 && count < NUM_SQUARES - (i / NUM_SQUARES) - 1) {

						// move must be greater or equal to NUM_SQUARES since nothing will move into top row
						for (var move = SQUARES.length - i - NUM_SQUARES + offset; move >= NUM_SQUARES; move -= NUM_SQUARES) {
							// Set square above to square below
							SQUARES[move] = SQUARES[move - NUM_SQUARES];
						}

						//Sets last square in column to 0
						SQUARES[offset] = 0;
						count++;
					}
				}
			}

			//Check for squares that can combine
			//Has to be outside the above for loop because of the way the squares are moved
			for (var i = SQUARES.length - NUM_SQUARES; i >= NUM_SQUARES; i -= NUM_SQUARES) {
				//Start at left then move right
				//Make sure receiving is not in top row
				for (var receiving = i; receiving < i + NUM_SQUARES; receiving++) {
					if (fibCheck(receiving, receiving - NUM_SQUARES) && SQUARES[receiving] != 0) {
						SQUARES[receiving] += SQUARES[receiving - NUM_SQUARES];
						SQUARES[receiving - NUM_SQUARES] = 0;
						
						//If squares combine, you need to move the rest of the squares into the empty space
						moveCollide(direction);
						break;
					}
				}
			}
		break;
	}	
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