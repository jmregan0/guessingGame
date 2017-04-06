function generateWinningNumber(){
    //Below will generate random number and make sure there is 
    //No chance that the number will return 0...just in case 
    return Math.floor(Math.random()* 100 + 1) ; 
}

//Fisher-Yates Algorithm 
function shuffle(arr) { 
   for(var i = arr.length-1; i > 0; i--) {
       var randomIndex = Math.floor(Math.random() * (i + 1));
       var temp = arr[i];
       arr[i] = arr[randomIndex];
       arr[randomIndex] = temp;
    }
    return arr;
}

function Game(){
    this.playersGuess = null ;  
    this.pastGuesses = [] ;
    this.winningNumber = generateWinningNumber() ;  
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber) ; 
    //Math.abs() used above so that even when the players 
    //guess is lower than the winning number, the difference 
    //will never return a negative number to represent the 
    //difference (or distance) from the winning number
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber ? true : false 
}

Game.prototype.playersGuessSubmission = function(num){
    if(num < 1 || num > 100 || isNaN(num)){
        throw "That is an invalid guess." ;
    }
    this.playersGuess = num ;
    return this.checkGuess() ; 
}

Game.prototype.checkGuess = function(){
    if(this.playersGuess === this.winningNumber){
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!");
        return "You Win!"  
    }
    else{
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            return "You have already guessed that number."
        }
        else{
            this.pastGuesses.push(this.playersGuess); 
        }
            if(this.pastGuesses.length > 4){
                return "You Lose."
            }
            else{
                if(this.difference() < 10){return "You're burning up!"}
                else if(this.difference() < 25){return "You're lukewarm."}
                else if(this.difference() < 50){return "You're a bit chilly."}
                else{return "You're ice cold!"}  
            }
        } 
    }

function newGame(){
    return new Game ; 
}

Game.prototype.provideHint = function(){
    var hint = [] ; 
    hint.push(this.winningNumber, generateWinningNumber(), generateWinningNumber()); 
    return shuffle(hint) ; 
}


//$$$       $$$ JQuery Below $$$      $$$          

$(document).ready(function(){
    var game = new Game(); 
    function makeAGuess(game){
        var guess = $('#players-input').val(); 
        $('#players-input').val('');
        var output = game.playersGuessSubmission(parseInt(guess, 10));
        $('#title').text(output);
        if(output !== "You have already guessed that number."){
            $('#Guesses').find(".guess:contains('-'):first").text(guess); 
        }  
    }
    $('#Go').on('click', function(){
        makeAGuess(game);
    })
    $('#players-input').on('keypress', function(){
       if(event.which == 13){
        makeAGuess(game); 
       } 
    });
    $('#Reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);
    })
    $('#Clue').click(function(){
        var hint = game.provideHint(); 
        $('#title').text("The winning number is " + hint[0] + ", " + hint[1] + ", or " + hint[2]); 
    });

})











