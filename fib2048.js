// TODO lose function
// TODO win function




var SQUARES;
var c;
var ctx;
var SIZE = 500;
var NUM_SQUARES = 4;
var SQUARE_SIZE = SIZE / NUM_SQUARES;
var FIB = [1, 2];
var score = 'Score'
var best = 'Best'
var myScore = 0
var bestScore = 0

//From html5 canvas tutorials
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    	
    };
})();

function initialize(canvas) {
	c = canvas;
	ctx = c.getContext("2d");
	ctx.font = "80px Arial";

	//Create array of zeros
	SQUARES = Array.apply(null, Array(NUM_SQUARES * NUM_SQUARES)).map(Number.prototype.valueOf,0);
	drawBoard();
	generateSquare();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
		context.fillStyle = "#8CA699";
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
}
	  
function drawBoard() {
	ctx.lineWidth = 15;
	ctx.fillStyle = "#8CA699";
	ctx.roundRect(0, 0, SIZE, SIZE, 20).fill();
	
	drawSquares();
	drawBoardTemplate();
	
	//ctx.fillStyle = "#FFCC99";
	//ctx.fillRect(30,20,150,150); 
	//ctx.fillRect(230,20,150,150); 
	//drawScore(ctx);
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

/*function drawScore(ctx){
	ctx.font = '20pt Calibri';
	ctx.fontcolor = "#3399FF";
	wrapText(ctx, score, 80, 70, 100, 15);
	wrapText(ctx, best, 270, 70, 100, 15);
	drawMyScore();
	drawBestScore(); 
	//wrapText(ctx, myScore, 100, 120, 100, 15);
	//wrapText(ctx, myBest, 300, 120, 100, 15);
	ctx.font = '100px solid';
	ctx.stroke;
}*/


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

/*function drawMyScore(){
	myScore = 0;
	for (var i = 0; i < SQUARES.length; i++) {
		if (SQUARES[i] > myScore) {
			myScore = SQUARES[i];
		}
	}
	console.log('myScore');
	ctx.font = '16pt Calibri';
	ctx.fillText(myScore, 100 , 120);
	ctx.font = '100px solid';
	ctx.stroke;
}

function drawBestScore(){
	for (var i = 0; i < SQUARES.length; i++) {
		if (SQUARES[i] > bestScore) {
			bestScore = SQUARES[i];
		}
	}
	ctx.font = '16pt Calibri';
	ctx.fillText(bestScore, 300, 120);
	ctx.font = '100px solid';
	ctx.stroke;
}*/

function resetGame(){
	initialize(document.getElementById("canvas"));
	myScore = 0;
	//drawMyScore();
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
			for (var row = 0; row < SQUARES.length; row += NUM_SQUARES) {
				for (var receiving = row; receiving < row + NUM_SQUARES - 1; receiving++) {
					while (fibCheck(receiving, receiving + 1) && SQUARES[receiving] != 0) {
						SQUARES[receiving] += SQUARES[receiving + 1];
						SQUARES[receiving + 1] = 0;

						for (var move = receiving + 1; move < NUM_SQUARES - 1; move++) {
							SQUARES[move] = SQUARES[move + 1];
						}

						SQUARES[row + NUM_SQUARES - 1] = 0;
						collided = true;
					}
				}
			}
		break;

		// up key pressed
		case 38:
			// Go through each row
			/*for (var row = 0; row < SQUARES.length; row += NUM_SQUARES) {
				for (var receiving = row; receiving < row + NUM_SQUARES; receiving++) {
					while (fibCheck(receiving, receiving + NUM_SQUARES) && SQUARES[receiving] != 0) {
						SQUARES[receiving] += SQUARES[receiving + NUM_SQUARES];
						SQUARES[receiving + NUM_SQUARES] = 0;

						var move, i;
						for (move = receiving + NUM_SQUARES, i = 0; i < NUM_SQUARES - 1; move += NUM_SQUARES, i++) {
							SQUARES[move] = SQUARES[move + NUM_SQUARES];
						}

						SQUARES[row + NUM_SQUARES * (NUM_SQUARES - 1)] = 0;
						collided = true;
					}
				}
			}*/
		break;
		
		// right key pressed
		case 39:
			// Go through each row
			/*for (var receiving = 0; receiving < SQUARES.length; receiving += NUM_SQUARES) {
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
			}*/
		break;

		// down key pressed
		case 40:
			// Go through each columns
			/*for (var receiving = 0; receiving < NUM_SQUARES; receiving ++) {
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
			}*/
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
			}

		break;

		// up key pressed
		case 38:
			// Go through each row
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
			}
		break;

		// down key pressed
		case 40:
			// Go through each row
			for (var i = 0; i < SQUARES.length; i += NUM_SQUARES) {
				for (var offset = 0; offset < NUM_SQUARES; offset++) {
					
					//Need count incase all values in column are zero
					var count = 0;
					while (SQUARES[SQUARES.length - NUM_SQUARES + offset] == 0 && count < NUM_SQUARES - (i / NUM_SQUARES) - 1) {

						// move < NUM_SQUARES * (NUM_SQUARES - 1) prevents move from being in the last row
						for (var move = SQUARES.length - NUM_SQUARES + offset - i; move >= 0; move -= NUM_SQUARES) {
							// Set square above to square below
							SQUARES[move] = SQUARES[move - NUM_SQUARES];
						}

						//Sets last square in column to 0
						SQUARES[offset] = 0;
						count++;
					}
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
			drawBoard();
			generateSquare();
			
			//checkLose();
		} 
	}
}, false);