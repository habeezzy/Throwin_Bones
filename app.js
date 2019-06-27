
/*--------------------------------------------------*/

//create variables for the most important things going on  in the game
var scores, roundScore, activePlayer, isPlaying;

//starts the game
init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(isPlaying) {

    // 1. Random number (removed dice var from global scope and put inside event function)
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result (displays the appropriate dice image)
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF  th rolled number was NOT an 1. added functionality for if a user rolls 2 6s back to back, loses turn and score.
    if(dice1 !== 1 && dice2 !== 1) {
      //add score then display in user interface
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player and resets score to 0
      nextPlayer();
    }
    /*
    if(dice === 6 && lastDice === 6) {
      //Player Loses score
      scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
    }else if(dice !== 1) {
      //add score then display in user interface
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player and resets score to 0
      nextPlayer();
    }
    //stores the last dice rolled
    lastDice = dice;
    */
  }

});


//------------HOLD BUTTON FUNCTIONALITY----------///



    document.querySelector('.btn-hold').addEventListener('click', function() {
      if(isPlaying) {
        //add CURRENT score to GLOBAL scores
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore;

        //undefined, 0, null or "" are coerced to false
        //anything else is coerced to true
        if(input) {
          winningScore = input;
        } else {
          winningScore = 100;
        }

        //check if player won the game
        if(scores[activePlayer] >= winningScore) {
          document.querySelector('#name-' + activePlayer).textContent = "Winner!";
          document.getElementById('.dice-1').style.display = 'none';
          document.getElementById('.dice-2').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          isPlaying = false;
        } else {
          nextPlayer();
        }
        //Next Player took next player functionality from the callback function above and created a separate function to call separately and not repeat code.
        // nextPlayer();
      }
});

    function nextPlayer() {
      //Next player and resets score to 0
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0;

      //resets player scores to 0
      document.getElementById('current-0').textContent = "0";
      document.getElementById('current-1').textContent = "0";
      //toggle between active player panels
      document.querySelector('.player-0-panel').classList.toggle('active')
      document.querySelector('.player-1-panel').classList.toggle('active')

      document.getElementById('dice-1').style.display = "none";
      document.getElementById('dice-2').style.display = "none";


    };


    document.querySelector('.btn-new').addEventListener('click', init);

    //initializes scores to zero to begin the game
    function init() {
      scores = [0,0];
      roundScore = 0;
      activePlayer = 0;
      //isPlaying is a state variable
      isPlaying = true;

      //when when page first loads, dice will be hidden.
      document.getElementById('dice-1').style.display = "none";
      document.getElementById('dice-2').style.display = "none";

      //setting all scores to 0 at start of game
      document.getElementById('score-0').textContent = "0";
      document.getElementById('score-1').textContent = "0";
      document.getElementById('current-0').textContent = "0";
      document.getElementById('current-1').textContent = "0";
      document.getElementById('name-0').textContent = 'Player 1';
      document.getElementById('name-1').textContent = 'Player 2';
      document.querySelector('.player-0-panel').classList.remove('winner');
      document.querySelector('.player-1-panel').classList.remove('winner');
      document.querySelector('.player-0-panel').classList.remove('active');
      document.querySelector('.player-0-panel').classList.add('active');
      document.querySelector('.player-1-panel').classList.remove('active');
    };


// above, I removed then added active class again to avoid applying an active class to panel twice.

//combining random method with floor method to return a random whole number instead of decimal.
// dice = Math.floor(Math.random() *6) + 1;

//used query selector with active player selection concatonated to make the query dynamic.

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector("#score-0").textContent;
// console.log(x);
