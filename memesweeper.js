var sizeX = 30;
var sizeY = 30;
var mineCount = 30;
var mines = new Array(20);
var revealCheck = new Array(20);
var numbers = new Array(20);
var clickCount = 0;
var timer = new easytimer.Timer();

window.onload = function () {
	
	canvas.width  = 600;
	canvas.height = 600; 
	canvas.style.width  = '600px';
	canvas.style.height = '600px';
    drawBoard();
	genMines();
    document.getElementById("canvas").addEventListener("click", getPosition, false);
    document.getElementById("canvas").addEventListener("oncontextmenu", rightclick, false);
	document.getElementById("playAgain").addEventListener("click", resetBoard);
	
	timer.start();
	timer.addEventListener('secondsUpdated', function (e) {
		$('#timer').html(timer.getTimeValues().toString());
	});
	timer.stop();
	
	// api
	update_scores();
}

function resetBoard() {
	var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	genMines();
	drawBoard();
	clickCount = 0;
	// reset timer
	timer.reset();
	timer.stop();
}
	

function genMines(){
	for (var i = 0; i < numbers.length; i++) {
	  numbers[i] = new Array(20);
	  for(var j = 0; j < numbers[i].length; j++){
		  numbers[i][j] = 0;
	  }
	}
	for (var i = 0; i < revealCheck.length; i++) {
	  revealCheck[i] = new Array(20);
	  for(var j = 0; j < revealCheck[i].length; j++){
		  revealCheck[i][j] = 0;
	  }
	}
	for (var i = 0; i < mines.length; i++) {
	  mines[i] = new Array(20);
	  for(var j = 0; j < mines[i].length; j++){
		  mines[i][j] = 0;
	  }
	}
	for(var i =0; i < mineCount; i++){
		var mineX = Math.floor(Math.random()*20);
		var mineY = Math.floor(Math.random()*20);
		if(mines[mineX][mineY] == 1){
			i--;
		} else {
			console.log(mineX + " " + mineY);
			mines[mineX][mineY] = 1;
			if(mineX > 0){
				numbers[mineX-1][mineY]++;
			}
			if(mineX < numbers.length-1){
				numbers[mineX+1][mineY]++;
			}
			if(mineY > 0){
				numbers[mineX][mineY-1]++;
			}
			if(mineY < numbers.length-1){
				numbers[mineX][mineY+1]++;
			}
			if(mineX > 0 && mineY > 0){
				numbers[mineX-1][mineY-1]++;
			}
			if(mineX < numbers.length-1 && mineY > 0){
				numbers[mineX+1][mineY-1]++;
			}
			if(mineX < numbers.length-1 && mineY < numbers.length-1){
				numbers[mineX+1][mineY+1]++;
			}
			if(mineX > 0 && mineY < numbers.length-1){
				numbers[mineX-1][mineY+1]++;
			}
		}
	}
	
	for (var i = 0; i < mines.length; i++) {
	  for(var j = 0; j < mines[i].length; j++){
		  if (mines[i][j] == 1) {
			numbers[i][j] = 0;
		  }
	  }
	}
}

function drawBoard(){
	
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
	for(var x = 0; x < canvas.width; x+=sizeX){
		for(var y =0; y < canvas.height; y+=sizeY){
			ctx.fillStyle = "#999999";
			ctx.fillRect(x, y, sizeX, sizeY);
			ctx.strokeRect(x, y, sizeX, sizeY);
			ctx.fillStyle = "#000000";
		}
	}
}

function drawNumber(x, y) {
	var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
	ctx.font = "30px Arial";
	if (mines[x][y] == 0 && revealCheck[x][y] == 0 ) {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(x*sizeX, y*sizeY, sizeX, sizeY);
		ctx.strokeRect(x*sizeX, y*sizeY, sizeX, sizeY);
		ctx.fillStyle = "#000000";
	}
	
	if (revealCheck[x][y] == 0 && numbers[x][y] != 0) {			
		ctx.fillText(numbers[x][y], x*sizeX+6, y*(sizeY)+26);
	}
	revealCheck[x][y] = 1;	
}

function revealBoard(x, y){
	if(numbers[x][y] == 0){
		drawNumber(x, y);
		if(x > 0 && revealCheck[x-1][y] == 0 && mines[x-1][y] == 0){
			revealBoard(x-1, y);
		}
		if(x < numbers.length-1 && revealCheck[x+1][y] == 0 && mines[x+1][y] == 0){
			revealBoard(x+1, y);
		}
		if(y > 0 && revealCheck[x][y-1] == 0 && mines[x][y-1] == 0){
			revealBoard(x, y-1);
		}
		if(y < numbers.length-1 && revealCheck[x][y+1] == 0 && mines[x][y+1] == 0){
			revealBoard(x, y+1);
		}
	} else {
		drawNumber(x, y);
	}
	
}

function revealEntireBoard() {
	for (var i = 0; i < mines.length; i++) {
		for (var j = 0; j < mines[i].length; j++) {
			if (mines[i][j] == 1) {
				// draw mine
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				ctx.clearRect(i*sizeX, j*sizeY, sizeX, sizeY);
				var img = document.getElementById("pikachu");
				ctx.drawImage(img, i*sizeX, j*sizeY, sizeX, sizeY);
			} else {
				drawNumber(i, j);
			}
		}
	}
}


function genNumberBoard(x, y){
	var mineX = x;
	var mineY = y;
	if(mineX > 0){
		number[mineX-1][mineY]--;
	}
	if(mineX < numbers.length-1){
		number[mineX+1][mineY]--;
	}
	if(mineY > 0){
		number[mineX][mineY-1]--;
	}
	if(mineY < numbers.length-1){
		number[mineX][mineY+1]--;
	}
	if(mineX > 0 && mineY > 0){
		number[mineX-1][mineY-1]--;
	}
	if(mineX < numbers.length-1 && mineY > 0){
		number[mineX+1][mineY-1]--;
	}
	if(mineX < numbers.length-1 && mineY < numbers.length-1){
		number[mineX+1][mineY+1]--;
	}
	if(mineX > 0 && mineY < numbers.length-1){
		number[mineX-1][mineY+1]--;
	}
}
function rightclick(event){
	event.preventDefault();
	return false;
}

function checkWon() {
	var sum = 0;
	for (var i = 0; i < revealCheck.length; i++) {
		for (var j = 0; j < revealCheck[i].length; j++) {
			sum += revealCheck[i][j];
		}
	}
	if (sum == revealCheck.length*revealCheck.length - mineCount) {
		// you win!
		timer.stop();
		// submit score
		highscore(document.getElementById("timer").innerHTML);
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
		timer.start();
		if(mines[x][y] == 1){
			mines[x][y] = 0;
			genNumberBoard(x, y);
		}
	}
		if(mines[x][y] == 1){
			// you lose
			timer.stop();
			revealEntireBoard();
			return;
		} else {
			revealBoard(x, y);
		}
	
	checkWon();
	clickCount++;
	
}