'use strict'

//make an audio object
const balloonPop = new Audio('assets/balloonPop.wav')

//make event listener on whole gameArea
const gameArea = document.querySelector('.game-area')

//get scoreElement
const scoreNumEl = document.querySelector('.scoreNumber')

//get start button element
const startBtnEl = document.querySelector('.start')

class Level {
  constructor(level, speed, minBubSize) {
    this.sound = balloonPop;
    this.gameArea = gameArea;
    this.score = scoreNumEl;
    this.nextLevelBtn = startBtnEl;
    this.generationSpeed = speed;
    this.level = level;
    this.minBubSize = minBubSize;
  }
  //function 
};

gameArea.addEventListener('click', (e)=> {
  if (e.target !== gameArea) {
    balloonPop.play()
    gameArea.removeChild(e.target)
    //add value with inverse relationship to size
    let width = Number(e.target.style.width.split('p')[0])
    let valueToAdd = Math.floor(10000 / width)
    //update score
    scoreNumEl.innerText = Number(scoreNumEl.innerText) + valueToAdd;
  }
  e.stopPropagation();
})

const chooseColor = ()=> {
  let colorArray= ['rgba(238, 113, 68, .9)', 'rgb(94, 176, 91)', 'rgba(242, 163, 134, 1)', 'rgb(109, 254, 245)', 'rgb(254, 245, 109)']
  let randomColorIndex = Math.floor(Math.random() * colorArray.length)
  return colorArray[randomColorIndex]
}

const makeBubble = (minSize) => {
    let bubble = document.createElement('span')
    bubble.classList.add('bubble')
    let randomXPosition = (Math.floor(Math.random() * 1000)).toString()
    let randomSize = (Math.floor(Math.random() * 300) + minSize).toString()
    bubble.style.height = randomSize + 'px'
    bubble.style.width = randomSize + 'px'
    bubble.style.left = randomXPosition + 'px'
    let randomColor = chooseColor()
    bubble.style.backgroundColor = randomColor
    console.log(randomXPosition + 'px');
    return bubble;
}



let generateBubbles = (generationSpeed)=> {
  let bubbleGen = setInterval(()=> {
    checkScore(bubbleGen)
    let bubble = makeBubble(300)
    gameArea.append(bubble);
    bubble.addEventListener('animationend', ()=> {
      console.log('game-over')
      gameArea.innerText= 'You Lost. Oh no!';
      clearInterval(bubbleGen)
    });
  }, generationSpeed)
}


startBtnEl.addEventListener('click', ()=> {
  generateBubbles(3000)
})

let checkScore= (interval)=> {
  if (Number(scoreNumEl.innerText) > 500) {
    //gameArea.style.textAlign = 'center'
    gameArea.innerText= 'You Passed Level 1!';
    console.log('you won')
    stopBubbles(interval)
  }
}
