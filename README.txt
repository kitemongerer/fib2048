Hello, our game is based off the popular game 2048. Instead of doing multiples of 2, we did the fibonnaci series.

How to play: use the left and right arrow keys to move blocks. Try to combine blocks that are next to each other in the fibonnaci series.
	ex: combine 1 and 1 to get 2. combine 2 and 1 to get 3.

A good strategy to do well quickly is pick either left or right and other up or down and just hit those buttons repeatedly unless you can't move anymore in those directions.

For this implementation, we defined winning as getting a block with 144 in it. Otherwise, it would take to long.

The CSS3 features we used were: border radius, gradient, and animation on the new game button when the page loads

Why this project is worth 100 points.
	This game took a fair amount of JavaScript logic to control the movement and combination of the blocks.
	Custom canvas animation when a new block is spawned (it grows as if from nothing!).
	Text size within the blocks changes size if it gets too big for the block.
	The blocks change colors based on what number is in them (to a point).
	Overrode canvas rendering prototype to draw round rectangles (with some help from online).
	Functions to detect winning and losing.
	Manipulating innerHtml in javascript to record high scores outside of the canvas.
	We have a copyright tag (cuz why not)!
	Super sweet new game animation on page load!
	The game is super fun to play!
	Gorgeous background imagery.

The hardest part to implement (by far) was the recursive movement loop. It was hard to get all the directions straight and make the iterative loops work out.
Also, originally we made a 3 X 3 grid and realized the game was not much fun and after writing all that logic we changed the grid size.
The second time we wrote, we made it dynamic. Our grid size can change to anything and the control logic will work (the only thing that won't work is drawing
all of the black gridlines).