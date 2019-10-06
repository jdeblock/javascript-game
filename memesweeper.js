var sizeX = 30;
var sizeY = 30;
var mines = new Array(20);
var numbers = new Array(20);
var clickCount = 0;

window.onload = function () {
	
	canvas.width  = 600;
	canvas.height = 600; 
	canvas.style.width  = '600px';
	canvas.style.height = '600px';
    drawBoard();
	genMines();
    document.getElementById("canvas").addEventListener("mousedown", getPosition, false);
}

function genMines(){
	for (var i = 0; i < numbers.length; i++) {
	  numbers[i] = new Array(20);
	}
	for (var i = 0; i < mines.length; i++) {
	  mines[i] = new Array(20);
	}
	for(var i =0; i < 20; i++){
		var mineX = Math.floor(Math.random()*21);
		var mineY = Math.floor(Math.random()*21);
		if(mines[mineX][mineY] == 1){
			i--;
		} else {
			mines[mineX][mineY] = 1;
		}
	}
}

function drawBoard(){
	
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
	for(var x = 0; x < canvas.width; x+=sizeX){
		for(var y =0; y < canvas.height; y+=sizeY){
			ctx.strokeRect(x, y, sizeX, sizeY);
			ctx.fillStyle = "#000000";
			
		}
	}
}
function genNumberBoard(var x, var y){
	
	for (var i=0; i< mines.length; i++) {
		for (var j=0; j< mines.length; j++) {
			
		}
	}
}


function getPosition(event)
{
	
	var rect = event.target.getBoundingClientRect();
    var x = event.x - rect.left;
    var y = event.y - rect.top - 0.125;
	x = Math.floor(x/sizeX);
	y = Math.floor(y/sizeY);
	
	if(clickCount == 0){
		if(mines[x][y] == 1){
			mines[x][y] = 0;
		}
		genNumberBoard();
	} else {
		if(mines[x][y] == 1){
			
		}
		
	}
	clickCount++;
	
}