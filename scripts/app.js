'use strict'

const game = {
  balloonPop: new Audio('assets/balloonPop.wav'),
  //add game over sound
  gameOverSound: new Audio('assets/bear_growl_y.wav'),
  gameArea: document.querySelector('.game-area'),
  scoreNumEl: document.querySelector('.scoreNumber'),
  startBtnEl: document.querySelector('.start')
}


const popBubble = (e)=> {
  if (e.target!== game.gameArea) {
    game.balloonPop.play()
    game.gameArea.removeChild(e.target)
    //add value with inverse relationship to size
    let width = Number(e.target.style.width.split('p')[0])
    let valueToAdd = Math.floor(10000 / width)
    //update score
    game.scoreNumEl.innerText = Number(game.scoreNumEl.innerText) + valueToAdd;
  }
  e.stopPropagation();
}

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
let addEventOnBub = function(gen, bub) {
  bub.addEventListener('animationend', ()=> {
      console.log('game-over')
      // play game over sound
      game.gameOverSound.play() 
      game.gameArea.innerText= 'You Lost. Oh no!';
      clearInterval(gen)
    });
}

let generateBubbles = (generationSpeed)=> {
  let bubbleGen = setInterval(()=> {
    let bubble = makeBubble(300)
    game.gameArea.append(bubble);
    checkScore(bubbleGen);
    addEventOnBub(bubbleGen, bubble);
  }, generationSpeed)
}

let checkScore= (interval)=> {
  if (Number(game.scoreNumEl.innerText) > 200) {
    //gameArea.style.textAlign = 'center'
    game.gameArea.innerText= 'You Passed Level 1!';
    console.log('you won')
    clearInterval(interval)
  }
}

game.gameArea.addEventListener('click', popBubble)
game.startBtnEl.addEventListener('click', ()=> {
  generateBubbles(3000)
})

/*
class Level {
  constructor(level, speed, minBubSize, scoreForLevelWin) {
    this.gameArea = gameArea;
    this.score = scoreNumEl;
    this.nextLevelBtn = startBtnEl;
    this.generationSpeed = speed;
    this.level = level;
    this.minBubSize = minBubSize;
    this.scoreForLevelWin = scoreForLevelWin;
  }
  //methods
};
*/
