var origBoard;
const human = 'X';
const ai = 'O';
var h_win=0;
var h_loss=0;
var h_tie=0;
var sound1 = new Audio('sadtrombone.swf..mp3'); 

const possiblewins = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell'); //gets all the cells

startGame(); //starts game

/*
name:startGame
input:none
return: none
modifes:
- origBoard
- .game-ended banner
- cells 
use:get the game ready to play variables are reset. 
how to get here: organinclly or by clicking reset
*/
function startGame() {
	document.querySelector(".game-ended").style.display = "none";  //removes banner from last game if possible 
	origBoard = Array.from(Array(9).keys()); //resets orignal board. so its all clear. from 0 to 8

	for (var i = 0; i < cells.length; i++)  //iterates each cell
	{
		cells[i].innerText = '';  //gets rid of any x or o from the board
		cells[i].style.removeProperty('background-color'); //gets rid of color from last game green(win) red(loss) or yellow(tie) if applicable 
		cells[i].addEventListener('click', boxclicked, false);  //makes all the cells clickable again.
	}
   
}

/*
name:boxclicked
input:square. (the cell clicked in the game)
return: none
modifes: none
use: gets a cell that is clicked and checks if its playable. human goes first then ai goes
how to get here: by user clicking a cell
*/
function boxclicked(square) //if a box is clicked 
{
	if (typeof origBoard[square.target.id] == 'number') //if the square  clicked on the board is previously unclick in the game  
	{
		turn(square.target.id, human) //human goes first
		turn(findBestSpot(), ai); //ai gets a turn
	}
	
}


/*
name:turn
input:squareId (the cell clicked in the game) | player (human or AI)
return: none
modifes: origBoard | cell on html | gamewon
use: gets a clickable cell that is clicked. puts the correct value (x or o) in the cell that is clicked. once done checks if the turn resulted in win and then check for tie.
how to get here: by user clicking a cell
*/
function turn(squareId, player) 
{
	origBoard[squareId] = player; //sets origBoard[squareId] with x or o depending on player
	document.getElementById(squareId).innerText = player; //sets the html cell with the x or o
	let gameWon = checkWin(origBoard, player) //call game won to see if the player who just played won
	if (gameWon) //if game is won
	{
		gameOver(gameWon) //end game
	}
	else
	{
		checkTie(); //if game is not over check for tie
	}
	
}


/*
name: checkWin
input: board (current board varname: origBoard) | player(the player that played last (x or o))
return: gameWon  (null if no win else board that won and player)
modifes: none
use: gets a board checks 
how to get here: organically on all turns 
*/
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of possiblewins.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

/*
name:
input:
return: none
modifes: 
use:
how to get here:
*/
function gameOver(gameWon) {
	for (let index of possiblewins[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', boxclicked, false);
	}
	declareWinner(gameWon.player == human ? "You win!" : "You lose.");
}

/*
name:
input:
return: none
modifes: 
use:
how to get here:
*/
function declareWinner(who) {
	document.querySelector(".game-ended").style.display = "block";
	document.querySelector(".game-ended .text").innerText = who;
    if(who=="You win!")
    {
       h_win++;
       var ptag = document.getElementById('ws');
	
       ptag.innerHTML = h_win;

    }
    if(who=="You lose.")
    {
        h_loss++;
        var ptag = document.getElementById('ls');
	    sound1.play();
       ptag.innerHTML = h_loss;
    }
    if(who=="Tie Game!")
    {
        h_tie++;
    	var ptag = document.getElementById('ts');
       	ptag.innerHTML = h_tie;
    }
}

/*
name:
input:
return: none
modifes: 
use:
how to get here:
*/
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}


/*
name:
input:
return: none
modifes: 
use:
how to get here:
*/
function findBestSpot() {
	return minimax(origBoard, ai).index;
}


/*
name:
input:
return: none
modifes: 
use:
how to get here:
*/
function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "yellow";
			cells[i].removeEventListener('click', boxclicked, false);
		}
		declareWinner("Tie Game!")

		return true;
	}
	return false;
}



/*
name:
input:
return: none
modifes: 
use:
how to get here:
*/
function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, human)) {
		return {score: -10};
	} else if (checkWin(newBoard, ai)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == ai) {
			var result = minimax(newBoard, human);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, ai);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === ai) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
