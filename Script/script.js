$(document).ready(function(){
	var game = [];
	var myMoves = [];
	var tiles = ['red', 'yellow', 'blue', 'green'];
	var count = 0;
	var sounds = {
		red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
		yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
		green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
		blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
	};
	var strict = false;
	var speed = 800;

	$('#strictBox').change(function(){
		if (this.checked) {
			strict = true;
		}
		else
			strict = false;
	});
	var disableSquares = function(choice) {
		for (var i = 0; i < tiles.length; i++) {
		  	if (choice) {
		      document.getElementById(tiles[i]).style.pointerEvents = 'none';
		    } else {
		      document.getElementById(tiles[i]).style.pointerEvents = 'auto';
		    }
		}
	}
	disableSquares(true);


	function generateMoves(){
		game.push(tiles[Math.floor(Math.random()*4)]);
		console.log(game);
		showTiles(game, 0);
	}

	function showTiles(game, index){
		disableSquares(true);
		if (index < game.length){
			if (count == 5) speed = 600;

			if (count == 9) speed = 500;

			if (count == 13) speed = 400;

			var color = game[index];

			console.log(color);
			$("#"+color).addClass('activeDiv');
			playSound("#"+color);

			setTimeout(function(){
				$("#"+color).removeClass('activeDiv');
				 showTiles(game, index+1);
			}, speed);
		}
		if (index == game.length) {
      		disableSquares(false);
    	}
	}

	function addMoves(move){
		myMoves.push(move);
	}

	function checkMoves(id){
		var lastElement = myMoves.length - 1;
		if (game[lastElement] !== myMoves[lastElement]) {
			
			if (strict) {
				// Oops! You lost!
				lostGame();
			}
			else{
				alert("Wrong move! Try again!!");
				// disableSquares(true);
				newRound();
				showTiles(game, 0);
			}
		}
		else{
			//alert("Welldone, go ahead");
			playSound("#"+id);
			var checkSteps = game.length === myMoves.length;
			
			if (checkSteps) {
				if (count === 20) {
					alert("Congrats! You win!!");
					winner();
					//show the dialog box to play again
				}
				else{
					console.log("Next round!");
					//next round must be called and player turns
					nextRound();
				}
			}
		}
	}

	function newGame(){
		resetGame();
		// alert("New game");
		updateScreen();
	}

	function resetGame(){
		game = [];
		speed = 800;
		count = 0;
		newRound();
		updateScreen();
 		enableButtons();
	}
	function enableButtons(){
		$("#start").prop("disabled", false);
 		$("#strictBox").prop("disabled", false);
	}

	function disableButtons(){
		$("#start").prop("disabled", true);
		$("#strictBox").prop("disabled", true);
	}
 
	function updateScreen(){
		$('#screen').val(count);
	}

	function newRound(){
		myMoves = [];
	}

	function nextRound(){
		newRound();
		count++;
		updateScreen();
		generateMoves();
	}

	function playSound(name){
		switch(name){
			case'#green':
				sounds.green.play();
				break;
			case'#blue':
				sounds.blue.play();
				break;
			case'#red':
				sounds.red.play();
				break;
			case'#yellow':
				sounds.yellow.play();
				break;
		};
	}

	function winner(){
		disableSquares(true);
		disableButtons();
		$('.endGame').addClass('winner');
		$('.statusText').text('Congratulations! You win!!!');
		$('.endGame').css('display', 'inline-block');
		$('#reset').prop('disabled',true);
		$('.endGame').css('display','inline');
	}

	function lostGame(){
		disableSquares(true);
		disableButtons();
		$('#reset').prop('disabled',true);
		$('.endGame').css('display','inline');
	}

	$('.red, .yellow, .blue, .green').click(function(){
		var clicked = $(this).attr('id');
		addMoves(clicked);
		checkMoves(clicked);
	});

	$('.red, .yellow, .blue, .green').mouseup(function(){
		$(this).removeClass('activeDiv');
	})
	.mousedown(function(){
		$(this).addClass('activeDiv');
	});

	$('#start').click(function(event){
		newGame();
		generateMoves();
		disableButtons();

		event.preventDefault();

	});
	

	$('#reset').click(function(event){
		resetGame();
		disableSquares(true);
		event.preventDefault();
	});

	$('#replay').click(function(event){
		resetGame();
		$('.endGame').css('display','none');
		$('#reset').prop('disabled', false);
		event.preventDefault();
	});
  
  
});
