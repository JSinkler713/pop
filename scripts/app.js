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
    e.target.classList.toggle('hidden')
    console.log('you clicked the target')
    balloonPop.play()
    //update score
    //set display to none
    //send a new bubble
  }
  e.stopPropagation();
})

//create bubbles down below with random x-coordinates, sizes, and all withinthe game-area with floatUp animations.
setInterval(()=> {
  let bubble = document.createElement('span')
  bubble.classList.add('bubble')
  let randomXPosition = (Math.floor(Math.random() * 1000)).toString()
  let randomSize = (Math.floor(Math.random() * 300)).toString()
  bubble.style.height = randomSize + 'px'
  bubble.style.width = randomSize + 'px'
  bubble.style.left = randomXPosition + 'px'
  
  console.log(randomXPosition + 'px');
  gameArea.append(bubble);
}, 5000);

