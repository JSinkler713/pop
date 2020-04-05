'use strict'

console.log('checking js file hooked up')

//make an audio object
let balloonPop = new Audio('balloonPop.wav')

//make event listener on whole gameArea




let gameArea = document.querySelector('.game-area')
//if a click hits a ball in the game-area then it
//console.logs a message
gameArea.addEventListener('click', (e)=> {
  if (e.target !== gameArea) {
    console.log('you clicked the target')
    balloonPop.play()
    //update score
    //set display to none
    //send a new bubble
  }
  e.stopPropagation();
})


