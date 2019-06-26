/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//create variables for the most important things going on  in the game
var scores, roundScore, activePlayer, isPlaying;

//starts the game
init()

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(isPlaying) {

    // 1. Random number (removed dice var from global scope and put inside event function)
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result (displays the appropriate dice image)
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + ".png";

    // 3. Update the round score IF th rolled number was NOT an 1
    if(dice !== 1) {
      //add score then display in user interface
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player and resets score to 0
      nextPlayer();
    }

  }

});


//------------HOLD BUTTON FUNCTIONALITY----------///



    document.querySelector('.btn-hold').addEventListener('click', function() {
      if(isPlaying) {
        //add CURRENT score to GLOBAL scores
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game

        if(scores[activePlayer] >= 21) {
          document.querySelector('#name-' + activePlayer).textContent = "Winner!";
          document.querySelector('.dice').style.display = 'none';
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

      document.querySelector('.dice').style.display = "none";


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
      document.querySelector('.dice').style.display = 'none';

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
