'use strict'

console.log('checking js file hooked up')

//make an audio object
let balloonPop = new Audio('balloonPop.wav')

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
    gameArea.removeChild(e.target)
    //try removeChild instead of toggle display none
    //e.target.classList.toggle('hidden')
    console.log('you clicked the target')
    balloonPop.play()
    //update score
    scoreNumEl.innerText = Number(scoreNumEl.innerText) + 10;
    
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
  }, 5000)
}
let stopBubbles = (interval)=> {
  clearInterval(interval)
}

let checkScore= (interval)=> {
  if (Number(scoreNumEl.innerText) == 50) {
    //gameArea.style.textAlign = 'center'
    gameArea.innerText= 'You Passed Level 1!';
    console.log('you won')
    stopBubbles(interval)
  }
}



/*
    setInterval(()=> {
      let offset = bubble.getBoundingClientRect().top - bubble.offsetWidth;
      console.log(offset)
   }, 100);
*/
