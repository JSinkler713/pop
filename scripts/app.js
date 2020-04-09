'use strict'

console.log('checking js file hooked up')

//make an audio object
let balloonPop = new Audio('assets/balloonPop.wav')

//make event listener on whole gameArea
let gameArea = document.querySelector('.game-area')

//get scoreElement
const scoreNumEl = document.querySelector('.scoreNumber')

//get start button element
const startBtnEl = document.querySelector('.start')



//if a click hits a ball in the game-area then it
//console.logs a message
gameArea.addEventListener('click', (e)=> {
  if (e.target !== gameArea) {
    //try removeChild instead of toggle display none
    //e.target.classList.toggle('hidden')
    console.log('you clicked the target')
    balloonPop.play()
    //update score
    //add value with inverse relationship to size
    let width = Number(e.target.style.width.split('p')[0])
    gameArea.removeChild(e.target)
    let valueToAdd = Math.floor(10000 / width)
    scoreNumEl.innerText = Number(scoreNumEl.innerText) + valueToAdd;
    
    //set display to none
    //send a new bubble
  }
  e.stopPropagation();
})

//create bubbles down below with random x-coordinates, sizes, and all withinthe game-area with floatUp animations.


const chooseColor = ()=> {
  let colorArray= ['rgba(238, 113, 68, .9)', 'rgb(94, 176, 91)', 'rgba(242, 163, 134, 1)', 'rgb(109, 254, 245)', 'rgb(254, 245, 109)']
  let randomColorIndex = Math.floor(Math.random() * colorArray.length)
  return colorArray[randomColorIndex]
}

startBtnEl.addEventListener('click', ()=> {
  generateBubbles()
})

let startPlay = () => {
  generateBubbles()
}

let generateBubbles = ()=> {
  let bubbleGen = setInterval(()=> {
    checkLoss(bubbleGen, 5)
    checkScore(bubbleGen)
    let bubble = document.createElement('span')
    bubble.classList.add('bubble')
    let randomXPosition = (Math.floor(Math.random() * 1000)).toString()
    let randomSize = (Math.floor(Math.random() * 300)).toString()
    bubble.style.height = randomSize + 'px'
    bubble.style.width = randomSize + 'px'
    bubble.style.left = randomXPosition + 'px'
    let randomColor = chooseColor()
    bubble.style.backgroundColor = randomColor
    console.log(randomXPosition + 'px');
    gameArea.append(bubble);
  }, 3000)
}
let stopBubbles = (interval)=> {
  clearInterval(interval)
}

let checkScore= (interval)=> {
  if (Number(scoreNumEl.innerText) > 500) {
    //gameArea.style.textAlign = 'center'
    gameArea.innerText= 'You Passed Level 1!';
    console.log('you won')
    stopBubbles(interval)
  }
}

let checkLoss = (interval, maxBubbles)=> {
  if (gameArea.children.length > maxBubbles) {
    console.log('you lost')
    gameArea.innerText= 'You Lost. Oh no!';
    stopBubbles(interval)
  }
}



/*
    setInterval(()=> {
      let offset = bubble.getBoundingClientRect().top - bubble.offsetWidth;
      console.log(offset)
   }, 100);
*/

//write a condition that checks for 5 balls on screen, if so, game over.
