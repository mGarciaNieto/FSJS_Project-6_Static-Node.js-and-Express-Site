
'use strict';

/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
let headerBtnClicked = false;

document.querySelector('#menu-icon').addEventListener('click', e => {
  !headerBtnClicked ? body.style.transform = 'translateX(300px)' : body.style.transform = 'translateX(0px)';
  return headerBtnClicked = !headerBtnClicked;
});

const cards = document.querySelectorAll('div.cell')
  const projects = [...cards]
  for (const project of projects) {
    let randomAniDelay = Math.floor(Math.random() * 500)
    project.style.animation = `fadeIn 1s .${randomAniDelay}s ease forwards`
  }