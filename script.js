'use strict';

// Select DOM elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerEl = document.querySelectorAll('.player');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const scoreEl = document.querySelectorAll('.score');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const currentEl = document.querySelectorAll('.current-score');

const diceEl = document.querySelector('.dice'); // Element for the dice image

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initialize score displays to 0
score0El.textContent = 0;
score1El.textContent = 0;

// Initialize scores and game state
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isGamePlaying = true; // Track if the game is active or has ended

// Switch to the next player
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore; // Reset current score display for the active player (0 or 1)
  activePlayer = activePlayer === 0 ? 1 : 0; // Toggle activePlayer between 0 and 1
  player0El.classList.toggle('player--active'); // Toggle player--active class to switch styling
  player1El.classList.toggle('player--active'); // Toggle player--active class to switch styling
};

// Handle dice roll
btnRoll.addEventListener('click', function () {
  if (isGamePlaying) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice; // Add dice value to current score
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; // Update current score display for the active player
    } else if (isGamePlaying) {
      // If dice is 1 and game is active, switch to next player
      switchPlayer();
    }
  }
});

// Handle holding the score
btnHold.addEventListener('click', function () {
  if (isGamePlaying) {
    scores[activePlayer] += currentScore; // Add current score to the active player’s total score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]; // Update total score display for the active player
  }

  if (scores[activePlayer] >= 100) {
    // If the active player’s score reaches 100 or more, they win, and the game ends
    isGamePlaying = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner'); // Add player--winner class to the active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active'); // Remove player--active class for cleaner UI
    diceEl.classList.add('hidden'); // Hide the dice image
  } else {
    // Switch to next player if score is less than 100
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  scores = [0, 0];

  for (let i = 0; i < currentEl.length; i++) {
    currentEl[i].textContent = currentScore;
  }

  for (let i = 0; i < playerEl.length; i++) {
    playerEl[i].classList.remove('player--winner');
  }

  for (let i = 0; i < scoreEl.length; i++) {
    scoreEl[i].textContent = scores[i];
  }

  player0El.classList.add('player--active');
  if (player1El.classList.contains('player--active')) {
    player1El.classList.remove('player--active');
  }

  diceEl.classList.remove('hidden');

  isGamePlaying = true;
  activePlayer = 0;
});
