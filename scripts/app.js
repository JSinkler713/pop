'use strict'

console.log('checking js file hooked up')
//check event listener on bubble
let bub= document.querySelector('.bubble')
bub.addEventListener('click', ()=> {
  console.log('clicked the ball')
  bub.style.display = 'none';
});

